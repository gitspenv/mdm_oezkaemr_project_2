FROM openjdk:21-jdk-slim

# Copy Files
WORKDIR /usr/src/app
COPY . .

RUN env

 RUN apt-get update && apt-get install -y dos2unix
 RUN dos2unix ./mvnw
# Install
RUN ./mvnw -Dmaven.test.skip=true package

# Docker Run Command
EXPOSE 8080
CMD ["java","-jar","/usr/src/app/target/wildcats-0.0.1-SNAPSHOT.jar"]