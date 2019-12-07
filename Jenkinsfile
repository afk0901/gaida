
node {

    stage('Clean')
    {
        sh 'echo I solemnly swear that I know not to run this without committing changes I want to keep!'
        sh 'git clean -dfxq'
        sh 'git stash'
    }


    def git = checkout scm
    stage("Build") {
        echo sh(returnStdout: true, script: 'env')
        sh 'export color=bla'
        sh 'printenv'
        sh "./scripts/docker_build.sh ${git.GIT_COMMIT}"
        sh "docker login --username afk0901 --password LUNDIogfanta199"
        sh "./scripts/docker_push.sh ${git.GIT_COMMIT}"
    }

    stage("Deploy") {
        sh "./scripts/jenkins_deploy.sh"
    }
}