// api.js

const express = require("express");
const axios = require("axios");
const router = express.Router();

// Test route
router.get("/test", (req, res) => {
  res.json({ message: "API is working" });
});

// GitHub API configuration
const githubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github.v3+json",
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
});

// Helper functions for GitHub data
async function getUserRepositories(username) {
  try {
    const response = await githubApi.get(`/users/${username}/repos`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user repositories:", error);
    throw error;
  }
}

async function getUserCommits(username, repo, since) {
  try {
    const response = await githubApi.get(`/repos/${username}/${repo}/commits`, {
      params: { author: username, since: since },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user commits:", error);
    throw error;
  }
}

// GitHub data route
router.get("/github/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const repos = await getUserRepositories(username);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const commitsPromises = repos.map((repo) =>
      getUserCommits(username, repo.name, oneMonthAgo.toISOString())
    );
    const commitsResults = await Promise.all(commitsPromises);

    const totalCommits = commitsResults.reduce(
      (sum, commits) => sum + commits.length,
      0
    );

    res.json({
      repositories: repos.length,
      totalCommits,
    });
  } catch (error) {
    console.error("Error in GitHub route:", error);
    res.status(500).json({ message: "Error fetching GitHub data" });
  }
});

module.exports = router;
