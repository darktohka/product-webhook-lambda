import { DynamoDBStreamEvent } from "aws-lambda";

const webhookUrl = process.env.DISCORD_WEBHOOK_URL || "";

export const handler = async (event: DynamoDBStreamEvent): Promise<void> => {
  for (const record of event.Records) {
    if (record.eventName === "INSERT") {
      const newItem = record.dynamodb?.NewImage;
      const message = {
        embeds: [
          {
            title: "New Product!",
            description: newItem
              ? `Name: ${newItem.name.S}\nDescription: ${newItem.description.S}\nStock: ${newItem.stock.N}`
              : "No information available",
            color: 0x00ff00,
          },
        ],
      };

      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
    }
  }
};
