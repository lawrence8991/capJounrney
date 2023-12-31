import { ListTablesCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    updateCommand, 
    PutCommand,
    DeleteCommand,
    ScanCommand,
    DynamoDbDocumentClient,
    ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import crypto from "crypto";
const client = new DynamoDBClient({ region: "us-east-1" });
const docClient = DynamoDbDocumentClient.from(client);

export const fetchTasks = async () => {
    const command = new ScanCommand({
        ExpressionAttributeNames: {name: "name"},
        ProjectionExpression: "id, #name, completed",
        TableName: "tasks",  
       }); 

       const response = await docClient.send(command);
       return response; 
    };

export const createTasks = async (name, completed) => {
    const uuid = crypto.randomUUID();
    const command = new PutCommand({
        TableName: "tasks",
        Item: {
            id: uuid,
            name,
            completed
        },
    })
    const response = await docClient.send(command);
    return response;
};


export const updateTasks = async (id, name, completed) => {

    const command = new UpdateCommand({
        TableName: "tasks",
        Key: {
            id,
        },
        UpdateExpression: "set #name = :n, completed = :c",
        ExpressionAttributeNames: {
            "#name": "name",
        },
        ExpressionAttributeValues: {
            ":n": name,
            ":c": completed,
        },
        ReturnValues: "ALL_NEW"
    });

    const response = await docClient.send(command);
    return response;
    };

export const DeleteTasks = async (id) => {
    const command = new deleteCommand({
        TableName: "tasks",
        Key: {
            id,
        },
    });
    const response = await docClient.send(command);
    return response;    
    };