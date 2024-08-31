// dashboard.js

const express = require("express");
const router = express.Router();
const axios = require("axios");
const authMiddleware = require("../middleware/auth");

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

// Dashboard route
router.get("/", authMiddleware, async (req, res) => {
  try {
    // For this example, we're assuming the GitHub username is stored in the user's profile
    // You might need to adjust this based on how you're storing the GitHub username
    const githubUsername = req.user.githubUsername; // You'll need to ensure this is available

    const repos = await getUserRepositories(githubUsername);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const commitsPromises = repos.map((repo) =>
      getUserCommits(githubUsername, repo.name, oneMonthAgo.toISOString())
    );
    const commitsResults = await Promise.all(commitsPromises);

    const totalCommits = commitsResults.reduce(
      (sum, commits) => sum + commits.length,
      0
    );

    // TODO: Add integrations with other services (Slack, Jira, etc.)

    res.json({
      github: {
        repositories: repos.length,
        totalCommits,
      },
      // Add other service data here
    });
  } catch (error) {
    console.error("Error in dashboard route:", error);
    res.status(500).json({ message: "Error fetching dashboard data" });
  }
});

module.exports = router;
