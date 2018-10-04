using System;

public static void Run(string inMsg, ILogger log)
{
    log.LogInformation(inMsg);
    log.LogInformation($"C# Event Hub trigger function processed a message: {inMsg}");
    outDoc = inMsg;
}
