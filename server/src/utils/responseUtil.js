// Export a function named `sendResponse` for standardizing HTTP responses.
export const sendResponse = (
  res, // The Express response object
  status, // HTTP status code (e.g., 200, 404, 500)
  data, // Payload for the response body, typically an object or array
  message // Optional message describing the result or error
) => {
  // Set the HTTP status and send a JSON response with a conditional message field
  res.status(status).json({
    // Determine success based on the HTTP status code (true if 200-299, otherwise false)
    success: status >= 200 && status < 300,

    // Include the provided data; use null if no data is provided
    data: data || null,

    // Conditionally include the message if it's provided
    ...(message ? { message } : {}),
  });
};
