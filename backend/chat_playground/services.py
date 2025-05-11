import boto3
import json


#is the client
bedrock_runtime = boto3.client(service_name="bedrock-runtime",region_name="us-east-2",)

def invoke(prompt):

    systemPrompt = """
                    Take the role of a helpful advisor chat bot. Your responses are detailed.
                    You never emojis. You are helping rewrite standard goals into
                    specific, measurable, achievable, relevant, and time-bound goals.
                    You engage human in a dialog by regularly asking clarifying questions,
                    except when Human indicates that the conversation is over.
                   """;

    prompt_config = {
        "prompt": f'\n\nHuman: {systemPrompt}\n\n{prompt}\n\nAssistant:',
        "max_tokens_to_sample": 1024,
        "temperature": 0.8
    }
    # body = {
    # "prompt": "\n\nHuman: What are S.M.A.R.T Goals?\n\nAssistant:",
    # "max_tokens_to_sample": 100,
    # "temperature": 0.5,
    # "stop_sequences": ["\n\nHuman:"]
    # }

    response = bedrock_runtime.invoke_model(
        body=json.dumps(prompt_config),
        modelId="anthropic.claude-v2",
        contentType='application/json',
        accept='application/json'
    )

    # response = bedrock_runtime.invoke_model(
    #     modelId='anthropic.claude-v2',
    #     body=json.dumps(body),
    #     contentType='application/json',
    #     accept='application/json'
    # )

    response_body = json.loads(response.get("body").read())
    print(response_body.get("completion"))


    #extract a value from a JSON object using the key "completion"
    return response_body.get("completion")