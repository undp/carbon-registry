# NestJS Server Starter 

aws cloudformation deploy --template-file ./deployment/aws-formation.yml --stack-name carbon-registry-basic --parameter-overrides EnvironmentName=dev DBPassword=abcd1234 --capabilities CAPABILITY_NAMED_IAM 