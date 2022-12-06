# UNDP Carbon Registry

UNDP Carbon Registry based on AWS Serverless 

## System Architecture
![alt text](./documention/imgs/System%20Architecture.svg)

## Project Structure

    .
    ├── .github                         # Github Actions files
    ├── deployment                      # AWS cloudformation files for initial resource creation and setup
    ├── lambda                          # Server implementation - NestJS applications
        ├── layer                       # AWS lambda layer
            ├── serverless.yml          # AWS Lambda Layer deployment configuration
        ├── services                    # AWS lambda function deployments scripts and implementation (NestJS application)
            ├── src
                ├── national-api        # National API NestJS module       
                ├── operational-api     # Operation API NestJS module
                ├── certifier-api       # Certifier API NestJS module
                ├── ledger-replicator   # QLDB ledger data replicator
                ├── shared              # Shared resources
            ├── serverless.yml          # AWS Lambda function deployment scripts for services 
    ├── libs
        ├── carbon-credit-calculator    # Node module implementation for the Carbon credit calculation library
        ├── serial-number-gen           # Node module implementation for the carbon programme serial number calculation
    ├── web                             # System ReactJS web frontend implementation
    ├── .gitignore
    └── README.md

## Run Services Locally
- Setup postgreSQL locally
- Update following DB configurations in the .env.local file (If file does not exist please create a new .env.local)
    - DB_HOST (Default localhost)
    - DB_PORT (Default 5432)
    - DB_USER (Default root)
    - DB_PASSWORD
    - DB_NAME (Default carbondbdev)
- Move to folder `cd lambda/service`
- Run `yarn install  --frozen-lockfile`
- Execute `sls offline --stage=local`
- Now all the system services are up and running. Swagger documentation will be available on `http://localhost:3000/local/api/national/docs#/`

## Deploy System on AWS
- Execute `aws cloudformation deploy --template-file ./deployment/aws-formation.yml --stack-name carbon-registry-basic --parameter-overrides EnvironmentName=<stage> DBPassword=<password> --capabilities CAPABILITY_NAMED_IAM`. This will create all the required resources on the AWS.
- 