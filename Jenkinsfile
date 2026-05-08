pipeline {
    agent any

    environment {
        // Defines the node modules path
        PATH = "${env.PATH}:/usr/local/bin"
    }

    stages {
        stage('Clone Repository') {
            steps {
                echo 'Cloning the GitHub repository...'
                // Assuming GitHub integration is configured. In a real scenario, use git url: '...'
                checkout scm
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                echo 'Installing Backend Dependencies...'
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                echo 'Installing Frontend Dependencies...'
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                echo 'Building Frontend...'
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Containers') {
            steps {
                echo 'Building Docker containers using Docker Compose...'
                // Using docker compose to build the images based on the docker-compose.yml
                sh 'docker compose build'
            }
        }

        stage('Run Containers') {
            steps {
                echo 'Starting Docker containers in detached mode...'
                // -d runs containers in the background
                sh 'docker compose up -d'
            }
        }

        stage('Verify Containers Running') {
            steps {
                echo 'Verifying running containers...'
                // Outputs the currently running docker containers to the Jenkins console
                sh 'docker ps'
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution complete.'
        }
        success {
            echo 'Deployment successful! The Lost and Found platform is running.'
        }
        failure {
            echo 'Deployment failed. Please check the logs.'
            // Optional: Automatically stop containers if the test/verify fails
            // sh 'docker compose down'
        }
    }
}
