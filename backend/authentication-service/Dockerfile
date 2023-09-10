# OpenJDK 17
FROM openjdk:17-jdk-slim AS build

# Gradle 8.2.1
WORKDIR /app

COPY gradlew .
COPY gradle gradle
COPY build.gradle.kts .
COPY settings.gradle.kts .

COPY src src

RUN chmod +x ./gradlew
RUN ./gradlew clean build

FROM openjdk:17-jdk-slim

WORKDIR /app

COPY --from=build /app/build/libs/*.jar app.jar


CMD ["java", "-jar", "app.jar"]
