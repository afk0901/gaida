
node {

    stage('Clean')
    {
        sh 'echo I solemnly swear that I know not to run this without committing changes I want to keep!'
        sh 'git clean -dfxq'
        sh 'git stash'
    }


    def git = checkout scm
    stage("Build") {
        sh "./scripts/docker_build.sh ${git.GIT_COMMIT}"
        sh "docker login --username afk0901 --password LUNDIogfanta199"
        sh "./scripts/docker_push.sh ${git.GIT_COMMIT}"
    }

     stage("Setup") {
        dir("game_api") {
            sh "npm install"
        }
    }
    stage("Lint") {
        dir("game_api") {
            sh "npm run eslint"
        }
    }
    stage("Test") {
        dir("game_api") {
            sh "npm run test:unit"
    step([
        $class: 'CloverPublisher',
        cloverReportDir: 'coverage',
        cloverReportFileName: 'clover.xml',
        healthyTarget: [methodCoverage: 80, conditionalCoverage: 80, statementCoverage: 80],
        unhealthyTarget: [methodCoverage: 50, conditionalCoverage: 50, statementCoverage: 50],
        failingTarget: [methodCoverage: 0, conditionalCoverage: 0, statementCoverage: 0]
        ])
        }
    }

    stage("Deploy") {
        //Parameter 1: The path where terraform should run, Paramter 2: The enevironment where the Terraform should run
        sh "./scripts/jenkins_deploy.sh ${git.GIT_COMMIT} production"
    }

    stage("API Test") {
        //Parameter 1: The path where terraform should run, Paramter 2: The enevironment where the Terraform should run
        sh "./scripts/jenkins_deploy.sh ${git.GIT_COMMIT} apitest"
    }

    
}