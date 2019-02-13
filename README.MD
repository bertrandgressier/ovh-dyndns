Docker image for using OVH Dyndns
====
https://docs.ovh.com/fr/domains/utilisation-dynhost/

Usage
====
docker run -d -e USER=username -e PASSWORD=password -e DOMAINS=domain1,domain2 --rm bertrandgressier/ovh-dyndns