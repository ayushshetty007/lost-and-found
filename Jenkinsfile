pipeline {
    agent any

    environment {
        PATH = "${env.PATH}:/usr/local/bin"
    }

    stages {
        stage('Clone Repository') {
            steps {
                echo 'Cloning the GitHub repository...'
                checkout scm
            }
        }

        stage('Cleanup Old Containers') {
            steps {
                echo 'Force removing any existing named containers to avoid conflicts...'
                sh '''
                    docker rm -f mongodb_container backend_container frontend_container prometheus_container grafana_container 2>/dev/null || true
                    docker compose down --remove-orphans 2>/dev/null || true
                    docker network rm lost-and-found_mern_network 2>/dev/null || true
                '''
            }
        }

        stage('Build Docker Containers') {
            steps {
                echo 'Building Docker containers using Docker Compose...'
                sh 'docker compose build'
            }
        }

        stage('Run Containers') {
            steps {
                echo 'Starting Docker containers in detached mode...'
                sh 'docker compose up -d'
            }
        }

        stage('Verify Containers Running') {
            steps {
                echo 'Verifying running containers...'
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
        }
    }
}
