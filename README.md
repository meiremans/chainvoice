## Chainvoice

Worlds first open source invoice program running on the Blockchain (IBM Hyperledger Fabric) 

## Based upon the fabcar example from IBM (V1.1.0)

Follow the fabcar instructions(nodejs) to run this

TO get an invoice by number:
node -e 'require("./queryFunctions.js").queryInvoiceByNumber(0)'

Delete Running Containers:
docker rm -f $(docker ps -aq)

To delete the chaindata:
docker rmi dev-peer0.org1.example.com-invoice-1.0-ffd502cdf1ea76d396300cc4b99c6e2b5157c2cd3e0780e523fb1e7d154729dd

to start:(in /invoice):
./startFabric.sh node

To register the admin user:
node enrollAdmin.js

To register a user:
node registerUser.js

