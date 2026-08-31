const API_URL =
  process.env.REACT_APP_API_URL ||
  "http://127.0.0.1:5050/api";


// ============================================================
// HELPER
// ============================================================

const getToken = () => {
  return localStorage.getItem("token");
};


const authHeaders = () => {

  const token = getToken();

  return token
    ? {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    : {
        "Content-Type": "application/json",
      };
};


const handleResponse = async (response) => {

  const data = await response.json().catch(
    () => ({})
  );

  if (!response.ok) {

    throw new Error(
      data.error ||
      data.message ||
      "Something went wrong"
    );
  }

  return data;
};


// ============================================================
// AUTH
// ============================================================

export const loginUser = async (
  email,
  password,
  role
) => {

  const response = await fetch(
    `${API_URL}/auth/login`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
        role,
      }),
    }
  );

  const data = await handleResponse(
    response
  );

  if (data.token) {

    localStorage.setItem(
      "token",
      data.token
    );
  }

  if (data.user) {

    localStorage.setItem(
      "currentUser",
      JSON.stringify(data.user)
    );
  }

  return data;
};


export const registerUser = async (
  userData
) => {

  const response = await fetch(
    `${API_URL}/auth/register`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      }),
    }
  );

  return handleResponse(response);
};


export const logoutUser = () => {

  localStorage.removeItem("token");

  localStorage.removeItem(
    "currentUser"
  );
};


export const getCurrentUser = async () => {

  const response = await fetch(
    `${API_URL}/auth/me`,
    {
      headers: authHeaders(),
    }
  );

  return handleResponse(response);
};


// ============================================================
// ISSUES
// ============================================================

export const getIssues = async () => {

  const response = await fetch(
    `${API_URL}/issues`,
    {
      headers: authHeaders(),
    }
  );

  const data = await handleResponse(
    response
  );

  return data.issues || [];
};


export const getIssueById = async (
  id
) => {

  const response = await fetch(
    `${API_URL}/issues/${id}`,
    {
      headers: authHeaders(),
    }
  );

  const data = await handleResponse(
    response
  );

  return data.issue;
};


export const createIssue = async (
  issueData
) => {

  const response = await fetch(
    `${API_URL}/issues`,
    {
      method: "POST",

      headers: authHeaders(),

      body: JSON.stringify({
        title: issueData.title,
        description: issueData.description,
        category:
          issueData.category || "Other",
        priority:
          issueData.priority || "Medium",
        location:
          issueData.location || "",
        image:
          issueData.image || null,
      }),
    }
  );

  return handleResponse(response);
};


export const updateIssueStatus = async (
  id,
  status,
  adminRemark = ""
) => {

  const response = await fetch(
    `${API_URL}/issues/${id}/status`,
    {
      method: "PUT",

      headers: authHeaders(),

      body: JSON.stringify({
        status,
        adminRemark,
      }),
    }
  );

  return handleResponse(response);
};


// ============================================================
// USERS
// ============================================================

export const getUsers = async () => {

  const response = await fetch(
    `${API_URL}/users`,
    {
      headers: authHeaders(),
    }
  );

  const data = await handleResponse(
    response
  );

  return data.users || [];
};


export const updateUserStatus = async (
  id,
  status
) => {

  const response = await fetch(
    `${API_URL}/users/${id}/status`,
    {
      method: "PUT",

      headers: authHeaders(),

      body: JSON.stringify({
        status,
      }),
    }
  );

  return handleResponse(response);
};


// ============================================================
// FEEDBACK
// ============================================================

export const submitFeedback = async (
  issueId,
  rating,
  comment
) => {

  const response = await fetch(
    `${API_URL}/issues/${issueId}/feedback`,
    {
      method: "POST",

      headers: authHeaders(),

      body: JSON.stringify({
        rating,
        comment,
      }),
    }
  );

  return handleResponse(response);
};


// ============================================================
// HEALTH CHECK
// ============================================================

export const checkBackend = async () => {

  const response = await fetch(
    `${API_URL}/health`
  );

  return handleResponse(response);
};