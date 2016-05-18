#java -cp svc/target/universal/stage/lib/m.h2database.h2-1.4.187.jar org.h2.tools.Server -tcp -tcpAllowOthers -tcpPort 8092 &
java -cp svc/target/universal/stage/lib/com.h2database.h2-1.4.187.jar org.h2.tools.Server -web -webAllowOthers -webPort 8082 &
