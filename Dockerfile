FROM mcr.microsoft.com/playwright:v1.44.0-focal
COPY . .
RUN npm install
RUN npm run e2e