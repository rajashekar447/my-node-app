pipeline {
    agent any

    stages {

        stage('Clone') {
            steps {
                echo 'Repository cloned successfully'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'cd $WORKSPACE && npm install'
            }
        }

        stage('Deploy using Ansible') {
            steps {
                sh '''
                cd /var/lib/jenkins/ansible
                ansible-playbook -i hosts deploy.yml
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh 'curl http://13.234.19.9'
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful'
        }

        failure {
            echo 'Deployment Failed'
        }
    }
}
