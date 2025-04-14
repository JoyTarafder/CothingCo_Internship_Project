exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      status: "online",
      message: "Next.js app is running correctly",
      timestamp: new Date().toISOString(),
    }),
  };
};
