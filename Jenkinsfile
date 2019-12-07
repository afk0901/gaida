
node {

    stage('Clean')
    {
        sh 'echo I solemnly swear that I know not to run this without committing changes I want to keep!'
        sh 'git clean -dfxq'
        sh 'git stash'
    }

    environment { 
        NODE_ENV = 'sdfsdfasfsd'
    }

    def git = checkout scm
    stage("Build") {
        sh 'set NODE_ENV=productin'
        sh 'echo NODEJS "${env.NODE_ENV}"'
        sh "./scripts/docker_build.sh ${git.GIT_COMMIT}"
        sh "docker login --username afk0901 --password LUNDIogfanta199"
        sh "./scripts/docker_push.sh ${git.GIT_COMMIT}"
    }

    stage("Deploy") {
        sh "./scripts/jenkins_deploy.sh"
    }
}