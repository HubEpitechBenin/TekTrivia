---
id: handleSubmit
title: handleSubmit.js
---

# `handleSubmit` Function

The `handleSubmit` function is a reusable utility designed to simplify the process of sending POST requests, handling errors, and managing responses in a clean and modular way.

```js
const handleSubmit = async (url, data, setError, onSuccess) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    
        const resData = await response.json();
    
        if (response.ok) {
            onSuccess?.(resData);
        } else {
            setError(resData.error || "An error occurs.");
        }
    } catch (err) {
        console.error("Network error :", err);
        setError("Network Error. Try again.");
    }
};
  
export default handleSubmit;
```

---

## Purpose

It handles form submissions or API calls by:

- Sending a `POST` request to a specified URL
- Parsing the response
- Handling network or server errors
- Calling a success callback when the request is successful

---

## File Location

This function is defined in a separate utility file and should be imported where needed:

```js
import handleSubmit from './path-to-handleSubmit';
```

---

## Parameters

| Parameter     | Type         | Required | Description                                                                 |
|---------------|--------------|----------|-----------------------------------------------------------------------------|
| `url`         | `string`     | ✅       | The API endpoint where the POST request will be sent.                       |
| `data`        | `object`     | ✅       | The payload to be sent in the request body, usually form or user data.     |
| `setError`    | `function`   | ✅       | A function used to update error state, typically from `useState`.          |
| `onSuccess`   | `function`   | ❌       | Optional callback triggered when the request is successful.                |

## Example Usage

```jsx
const handleLogin = () => {
  const loginData = { email, password };

  handleSubmit("/api/login", loginData, setError, (resData) => {
    // Example: redirect or update state on success
    console.log("Login success:", resData);
    navigate("/dashbord");
  });
};
```

## Error Handling

- If the request fails (non-2xx status), the function tries to retrieve an error message from the response (resData.error).
- If a network error occurs (e.g., no internet), it sets a generic message: "Network error. Please try again."

## Notes

- The function is asynchronous and uses await.
- The optional chaining onSuccess?.(resData) ensures no error is thrown if onSuccess is not provided.
- This utility promotes DRY (Don't Repeat Yourself) code in form submission logic.



