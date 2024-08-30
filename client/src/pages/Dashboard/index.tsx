import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import PerformanceChart from "../../components/PerformanceChart";

interface GitHubEntity {
  id: string;
  login: string;
  avatar_url: string;
  type: "User" | "Organization";
}

interface CommitData {
  count: number | null;
  error: string | null;
  dailyData: { name: string; commits: number }[];
  trend: "increase" | "decrease" | "stable";
  isHighPerformer: boolean;
}

const Dashboard: React.FC = () => {
  const [entities, setEntities] = useState<GitHubEntity[]>([]);
  const [newEntity, setNewEntity] = useState<string>("");
  const [commitData, setCommitData] = useState<{ [key: string]: CommitData }>(
    {}
  );
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);
  const token = import.meta.env.VITE_GITHUB_PERSONAL_ACCESS_TOKEN as string;

  const addEntity = () => {
    if (newEntity && !entities.some((e) => e.login === newEntity)) {
      fetchEntityData(newEntity);
      setNewEntity("");
    }
  };

  const fetchEntityData = async (login: string) => {
    try {
      const response = await axios.get<{
        login: string;
        avatar_url: string;
        type: "User" | "Organization";
      }>(`https://api.github.com/users/${login}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const newEntity: GitHubEntity = {
        id: uuidv4(),
        login: response.data.login,
        avatar_url: response.data.avatar_url,
        type: response.data.type,
      };
      setEntities((prev) => [...prev, newEntity]);
      fetchCommitData(newEntity);
    } catch (error) {
      console.error(`Error fetching data for ${login}:`, error);
    }
  };

  const fetchCommitData = async (entity: GitHubEntity) => {
    setIsLoading((prev) => ({ ...prev, [entity.login]: true }));
    setCommitData((prev) => ({
      ...prev,
      [entity.login]: {
        count: null,
        error: null,
        dailyData: [],
        trend: "stable",
        isHighPerformer: false,
      },
    }));

    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    try {
      let totalCount = 0;
      const dailyData: { name: string; commits: number }[] = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(sevenDaysAgo.getTime() + i * 24 * 60 * 60 * 1000);
        const dateString = date.toISOString().split("T")[0];
        const nextDate = new Date(date.getTime() + 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0];

        const query =
          entity.type === "Organization"
            ? `q=org:${entity.login}+committer-date:${dateString}..${nextDate}`
            : `q=author:${entity.login}+author-date:${dateString}..${nextDate}`;

        const response = await axios.get<{ total_count: number }>(
          `https://api.github.com/search/commits?${query}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/vnd.github.cloak-preview",
            },
          }
        );

        totalCount += response.data.total_count;
        dailyData.push({
          name: dateString,
          commits: response.data.total_count,
        });
      }

      const trend = calculateTrend(dailyData);
      const isHighPerformer = dailyData.every((day) => day.commits >= 10);

      setCommitData((prev) => ({
        ...prev,
        [entity.login]: {
          count: totalCount,
          error: null,
          dailyData,
          trend,
          isHighPerformer,
        },
      }));
    } catch (error) {
      console.error(`Error fetching commit data for ${entity.login}:`, error);
      setCommitData((prev) => ({
        ...prev,
        [entity.login]: {
          count: null,
          error: "Failed to fetch commit data",
          dailyData: [],
          trend: "stable",
          isHighPerformer: false,
        },
      }));
    } finally {
      setIsLoading((prev) => ({ ...prev, [entity.login]: false }));
    }
  };

  const calculateTrend = (
    dailyData: { name: string; commits: number }[]
  ): "increase" | "decrease" | "stable" => {
    if (dailyData.length < 2) return "stable";
    const firstHalf = dailyData
      .slice(0, 3)
      .reduce((sum, day) => sum + day.commits, 0);
    const secondHalf = dailyData
      .slice(-3)
      .reduce((sum, day) => sum + day.commits, 0);
    if (secondHalf > firstHalf) return "increase";
    if (secondHalf < firstHalf) return "decrease";
    return "stable";
  };

  const toggleChart = (login: string) => {
    setSelectedEntity((prevSelected) =>
      prevSelected === login ? null : login
    );
  };

  return (
    <div className="dashboard p-4">
      <h1 className="text-2xl font-bold mb-4">GitHub Commit Stats</h1>
      <div className="mb-4">
        <input
          type="text"
          value={newEntity}
          onChange={(e) => setNewEntity(e.target.value)}
          placeholder="Add GitHub username or organization"
          className="p-2 border rounded mr-2"
        />
        <button
          onClick={addEntity}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Entity
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {entities.map((entity) => (
          <div
            key={entity.id}
            className="bg-gray-100 p-4 rounded-lg shadow-md relative"
          >
            {commitData[entity.login]?.isHighPerformer && (
              <span className="absolute top-2 right-2 text-yellow-500">⭐</span>
            )}
            {commitData[entity.login]?.trend !== "stable" && (
              <span
                className={`absolute top-2 left-2 px-2 py-1 text-xs font-bold rounded ${
                  commitData[entity.login]?.trend === "increase"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {commitData[entity.login]?.trend === "increase" ? "▲" : "▼"}
              </span>
            )}
            <img
              src={entity.avatar_url}
              alt={`${entity.login}'s avatar`}
              className="w-24 h-24 rounded-full mx-auto"
            />
            <p className="text-center mt-2 font-semibold">{entity.login}</p>
            <p className="text-center text-sm text-gray-500">{entity.type}</p>
            <p className="text-center mt-2">
              {isLoading[entity.login] ? (
                <span className="text-gray-500">Loading commits...</span>
              ) : commitData[entity.login]?.error ? (
                <span className="text-red-500">
                  {commitData[entity.login].error}
                </span>
              ) : (
                `Commits Last 7 Days: ${commitData[entity.login]?.count || 0}`
              )}
            </p>
            <button
              onClick={() => toggleChart(entity.login)}
              className="mt-2 bg-blue-500 text-white p-2 rounded w-full"
            >
              {selectedEntity === entity.login ? "Hide Chart" : "Show Chart"}
            </button>
            {selectedEntity === entity.login &&
              commitData[entity.login]?.dailyData && (
                <div className="mt-4">
                  <PerformanceChart data={commitData[entity.login].dailyData} />
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
