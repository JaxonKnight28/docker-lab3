# Docker instructions

Download and unzip, then run the following commands in the project folder:

1. ```docker build -t user_manager_stack_image:latest .```
2. ```docker stack deploy -c docker-compose.yaml myapp-stack```
3. Navigate to ```localhost:3000``` and ```localhost:3001```

Scaling:

```docker service scale myapp-stack_first-swarm=7``` first stack

```docker service scale myapp-stack_second-swarm=2``` second stack

Delete entire stack and containers: 

```docker stack rm myapp-stack```
