pipeline {
    agent any

    environment {
        NEXUS_URL  = '172.31.36.124:8081'
        NEXUS_REPO = 'app-artifacts'
        APP_NAME   = 'my-node-app'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Package Artifact') {
            steps {
                sh '''
                    rm -rf artifact
                    mkdir -p artifact

                    tar --exclude=node_modules \
                        --exclude=.git \
                        --exclude=artifact \
                        -czf artifact/${APP_NAME}-${BUILD_NUMBER}.tar.gz .

                    ls -lh artifact/
                '''
            }
        }

        stage('Upload to Nexus') {
            steps {
                nexusArtifactUploader(
                    nexusVersion: 'nexus3',
                    protocol: 'http',
                    nexusUrl: "${NEXUS_URL}",
                    groupId: 'com.example',
                    version: "${BUILD_NUMBER}",
                    repository: "${NEXUS_REPO}",
                    credentialsId: 'nexus-credentials',
                    artifacts: [
                        [
                            artifactId: "${APP_NAME}",
                            classifier: '',
                            file: "artifact/${APP_NAME}-${BUILD_NUMBER}.tar.gz",
                            type: 'tar.gz'
                        ]
                    ]
                )
            }
        }
    }

    post {
        success {
            echo 'Build and Nexus artifact upload completed successfully.'
        }

        failure {
            echo 'Build failed. Artifact was not published.'
        }
    }
}


