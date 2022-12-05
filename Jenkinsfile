
pipeline {
  agent any

	tools {
		nodejs "NodeJS"
	}
	
	environment {
		PROJECT_ID = 'tech-rnd-project'
                CLUSTER_NAME = 'network18-cluster'
                LOCATION = 'us-central1-a'
                CREDENTIALS_ID = 'kubernetes'	
		
		PROJECTKEY= 'network'
        	SONARURL = 'http://34.93.6.57:9000'
        	LOGIN= 'sqp_f741d02efb6d27d1a32f33fba69855545cdfc646'
	}
	
    stages {
	    stage('Scm Checkout') {
		    steps {
			    	checkout scm
		    }
	    }
	    
	     stage('Code Quality Check via SonarQube') {
        steps {
            script {
            def scannerHome = tool 'sonarqube-9.7.1';
               withSonarQubeEnv(credentialsId: 'sonarqube'){
                sh "${tool("sonarscanner")}/bin/sonarqube-9.7.1 \
                -Dsonar.projectKey=${env.PROJECTKEY} \
                -Dsonar.sources=. \
                -Dsonar.host.url=${env.SONARURL} \
                -Dsonar.login=${env.LOGIN}"
                    }
                }
            }
        }
               
      
    
	    
	    stage('Quality'){
            steps{
                script{
                    sleep(10)
                    //qualitygate = waitForQualityGate()
                    //if (qualitygate.status != "OK") {
                      //  currentBuild.result = "FAILURE"
                        //slackSend (channel: '****', color: '#F01717', message: "*$JOB_NAME*, <$BUILD_URL|Build #$BUILD_NUMBER>: Code coverage threshold was not met! <http://****.com:9000/sonarqube/projects|Review in SonarQube>.")
                    //}
                
                    waitForQualityGate abortPipeline: true                    
                }
            }
           }

	    
	    stage('Build Docker Image') {
		    steps {
			    sh 'whoami'
			    sh 'sudo chmod 777 /var/run/docker.sock'
			    
			    sh ' sudo apt update'
 			    sh 'sudo apt install software-properties-common -y'
			    

			    
				    
				sh 'sudo add-apt-repository ppa:cncf-buildpacks/pack-cli'
			    
 				 sh 'sudo  apt-get update'
 				  sh 'sudo apt-get install pack-cli'
			   
				  sh 'pack build app --builder paketobuildpacks/builder:full'
			    	  sh "sudo docker tag app:latest gcr.io/tech-rnd-project/faz-todo:${env.BUILD_ID}"
			    
		    }
	    }
	    
	    stage("Push Docker Image") {
		    steps {
			    script {
				    echo "Push Docker Image"
				        sh 'gcloud auth configure-docker'
				        sh "sudo docker push gcr.io/tech-rnd-project/faz-todo:${env.BUILD_ID}"
				    
					sh 'curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl'

					sh "chmod +x kubectl"

					sh "sudo mv kubectl \$(which kubectl)"

				    
			    }
		    }
	    }
	    
	    stage('Deploy to K8s') {
		    steps{
			    echo "Deployment started ..."
			    sh 'ls -ltr'
			    sh 'pwd'
				sh "sed -i 's/tagversion/${env.BUILD_ID}/g' deployment.yaml"
				echo "Start deployment of deployment.yaml"
				step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'deployment.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
			    	echo "Deployment Finished ..."
			    sh '''
			    '''
			    
		    }
	    }
    }
}
