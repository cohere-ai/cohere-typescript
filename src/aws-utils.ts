
export type AwsProps = {
    awsRegion: string;
    awsAccessKey?: string;
    awsSecretKey?: string;
    awsSessionToken?: string;
};

export type AwsPlatform = "sagemaker" | "bedrock"

export type AwsEndpoint = "chat" | "generate" | "embed"

// {'url_path': '/endpoints/cohere-command-light/invocations', 'query_string': {}, 'method': 'POST', 'headers': {'Content-Type': 'application/json', 'User-Agent': 'Boto3/1.34.96 md/Botocore#1.34.96 ua/2.0 os/macos#23.4.0 md/arch#arm64 lang/python#3.9.6 md/pyimpl#CPython cfg/retry-mode#legacy Botocore/1.34.96'}, 'body': b'{"prompt": "Write a LinkedIn post about starting a career in tech:", "max_tokens": 400, "temperature": 1.0, "k": 0, "p": 0.75, "stream": false, "num_generations": 1}', 'url': 'https://runtime.sagemaker.us-west-2.amazonaws.com/endpoints/cohere-command-light/invocations', 'context': {'client_region': 'us-west-2', 'client_config': <botocore.config.Config object at 0x17311f730>, 'has_streaming_input': True, 'auth_type': None}}
// {'url_path': '/endpoints/cohere-command-light/invocations-response-stream', 'query_string': {}, 'method': 'POST', 'headers': {'Content-Type': 'application/json', 'User-Agent': 'Boto3/1.34.96 md/Botocore#1.34.96 ua/2.0 os/macos#23.4.0 md/arch#arm64 lang/python#3.9.6 md/pyimpl#CPython cfg/retry-mode#legacy Botocore/1.34.96'}, 'body': b'{"prompt": "Write a LinkedIn post about starting a career in tech:", "max_tokens": 400, "temperature": 1.0, "k": 0, "p": 0.75, "stream": true, "num_generations": 1}', 'url': 'https://runtime.sagemaker.us-west-2.amazonaws.com/endpoints/cohere-command-light/invocations-response-stream', 'context': {'client_region': 'us-west-2', 'client_config': <botocore.config.Config object at 0x17311f730>, 'has_streaming_input': True, 'auth_type': None}}
export const getUrl = (
    platform: "bedrock" | "sagemaker",
    awsRegion: string,
    model: string,
    stream: boolean,
): string => {
    const endpoint = {
        "bedrock": stream ? "invoke-with-response-stream" : "invoke",
        "sagemaker": stream ? "invocations-response-stream" : "invocations"
    }[platform];
    return {
        "bedrock": `https://${platform}-runtime.${awsRegion}.amazonaws.com/model/${model}/${endpoint}`,
        "sagemaker": `https://runtime.sagemaker.${awsRegion}.amazonaws.com/endpoints/${model}/${endpoint}`
    }[platform];
}
