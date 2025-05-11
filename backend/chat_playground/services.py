import boto3
import json


#is the client
bedrock_runtime = boto3.client(
    service_name="bedrock-runtime",
    region_name="us-west-2",
    
)

def invoke(prompt):

    systemPrompt = """
                    Take the role of a helpful advisor chat bot. Your responses are detailed.
                    You never emojis. You are helping rewrite standard goals into
                    specific, measurable, achievable, relevant, and time-bound goals.
                    You engage human in a dialog by giving 3 S.M.A.R.T goals related to their business and follow up with 1 clarifying question,
                    except when Human indicates that the conversation is over.
                   """;
    # messages = [
    #     {"role": "system", "content": systemPrompt},
    #     {"role": "user", "content": prompt}
    # ]

    formatted_prompt = f"\n\nHuman: {systemPrompt}\n\nHuman: {prompt}\n\nAssistant:"

    prompt_config = {
        "anthropic_version": "bedrock-2023-05-31",
        "max_tokens": 500,
        "temperature": 0.8,
        "top_k": 250,
        "stop_sequences": ["\n\nHuman:"],
        "messages": [
        {
            "role": "user",
            "content": [{"type": "text", "text": formatted_prompt}],
        }
    ],
    }



    # response = bedrock_runtime.invoke_model(
    #     body=json.dumps(prompt_config),
    #     modelId="anthropic.claude-v2",
    #     contentType='application/json',
    #     accept='application/json'
    # )

    # response_body = json.loads(response.get("body").read())
    # print(response_body.get("completion"))


    # #extract a value from a JSON object using the key "completion"
    # return response_body.get("completion")



    try:
        # response = bedrock_runtime.invoke_model(
        #     body=json.dumps(prompt_config),
        #     modelId='anthropic.claude-v2',
        #     contentType='application/json',
        #     accept='application/json'
        # )
        response = bedrock_runtime.invoke_model(
            body=json.dumps(prompt_config),
            #modelId='anthropic.claude-v2',
            modelId ='anthropic.claude-3-5-haiku-20241022-v1:0',
            contentType='application/json',
            accept='application/json'
        )

        response_body = json.loads(response.get("body").read())
        completion = response_body.get("content")[0].get("text")
        print(completion)
        return completion

    except Exception as e:
        print(f"Error invoking model: {e}")
        # It's good practice to see the full error, especially for a 500
        if hasattr(e, 'response') and 'Error' in e.response:
            print(f"Bedrock Error: {e.response['Error']}")
        return None