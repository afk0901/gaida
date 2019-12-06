node {
    def git = checkout scm
    stage("Build") {
        sh "./scripts/docker_build.sh ${git.GIT_COMMIT}"
        sh "cat ./dockerpass.txt | docker login --username afk0901 --password-stdin"
        sh "./scripts/docker_push.sh ${git.GIT_COMMIT}"
        sh "echo LUNDIogfanta199 > ./dockerpass.txt" 
    }
}

node('build_server')
        {
            stage('WS clean')
            {
                 echo 'I solemnly swear that I know not to run this without committing changes I want to keep!'
                 git clean -dfxq
                 git stash
            }
        }
