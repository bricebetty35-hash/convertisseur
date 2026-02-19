pipeline {
    agent any

    environment {
        REGISTRY = "docker.io"
        IMAGE_NAME = "tonuser/tonimage"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/tonuser/tonrepo.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Angular') {
            steps {
                sh 'npm run build --prod'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t $IMAGE_NAME:latest ."
            }
        }

        stage('Login to Registry') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds',
                                                 usernameVariable: 'USER',
                                                 passwordVariable: 'PASS')]) {
                    sh "echo $PASS | docker login -u $USER --password-stdin"
                }
            }
        }

        stage('Push Image') {
            steps {
                sh "docker push $IMAGE_NAME:latest"
            }
        }

        stage('Deploy') {
            steps {
                sh """
                docker pull $IMAGE_NAME:latest
                docker stop angular-app || true
                docker rm angular-app || true
                docker run -d --name angular-app -p 80:80 $IMAGE_NAME:latest
                """
            }
        }
    }
}
