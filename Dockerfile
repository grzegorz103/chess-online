FROM maven:3.6.0-jdk-11-slim AS build
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package

FROM java:8
EXPOSE 8080
ADD /target/api-0.0.1-SNAPSHOT.jar api-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","api-0.0.1-SNAPSHOT.jar"]
