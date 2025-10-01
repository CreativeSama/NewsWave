// File: netlify/functions/getNews.js

exports.handler = async function (event, context) {
  // Get query parameters from the request URL
  const { country, topic, page, pageSize } = event.queryStringParameters;
  const apiKey = process.env.GNEWS_API_KEY; // Use the environment variable

  const apiUrl = `https://gnews.io/api/v4/top-headlines?lang=en&country=${country}&topic=${topic}&page=${page}&pageSize=${pageSize}&token=${apiKey}`;

  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(apiUrl);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch news' }),
    };
  }
};