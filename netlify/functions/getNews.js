// File: netlify/functions/getNews.js

exports.handler = async function (event, context) {
  const { country, topic, page, pageSize } = event.queryStringParameters;
  const apiKey = process.env.GNEWS_API_KEY;

  const apiUrl = `https://gnews.io/api/v4/top-headlines?lang=en&country=${country}&topic=${topic}&page=${page}&pageSize=${pageSize}&token=${apiKey}`;

  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(apiUrl);
    const data = await response.json();

    // This new line will print the GNews response to your log
    console.log("Response from GNews API:", data);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error fetching from GNews:", error); // Added for better error logging
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch news' }),
    };
  }
};