---
title: False alarm. My servers are not compromised. Phew! 😮💨
---

Good news — my servers aren't compromised. The [last email](https://ckarchive.com/b/68ueh8hq67lg) was a false alarm (thankfully) 😮💨.

Here's what actually happened:

- My servers started acting up somewhere last August after I upgrade to Ubuntu 20.04 — the SSH connection would get stuck for some unknown reason. I tried implementing many solutions but they couldn't work, I gave up.
- There was another issue where I couldn't use \`apt update\`, \`systemctl reboot\` and other core functions.
- Fast forward to these few weeks. Suddenly the SSH connection issue got worse — the port closed and I had to restart the server before I could SSH in.
- I got frustrated and I started asking friends if they knew what happened. A friend said she had something who could help, and asked me to send some logs over. I didn't know what logs to send, they didn't specify, so I sent over my system logs (thinking it was useful).
- Said person was unwilling to jump onto a call / connect directly with me, and said he suspects my server was compromised.
- Not having lots of sysadmin knowledge, I panicked. Since decommissioning my servers and spinning up a new one would cause some downtime, I decided to send you a message (hence [the email](https://ckarchive.com/b/68ueh8hq67lg)).
- After some poking from you guys, I went to check the auth logs and discovered no suspicious activity. There also weren't any suspicious files anywhere on my system. So I concluded there's no compromise.
- There were some DDOS happening for sure though — this could have caused the ports to close.
- Regarding the core functions, I learnt that I shouldn't have upgraded from Ubuntu 16.04 straight to Ubuntu 20.04. I should have went to 18.04 first before upgrading. (Got to know this too late though).

In summary:

- The real issue was DDOS, but my server didn't get compromised.
- Regarding core functions, I shouldn't have upgraded from Ubuntu 16.04 straight to 20.04. It could have caused the issues I faced.

I shouldn't have trusted someone who didn't properly diagnose my server. Misinformation is really dangerous. Unfortunately, there are people who conclude before properly troubleshooting something.

Anyway, I decommissioned my server and spun up a new one. Everything is now working properly so there shouldn't be any downtime now. Thanks for you patience!

Thank you everyone for responding so kindly to me, and for helping me figure out UFW, sysadmin, and server security.

I have more confidence in producing a Digital Ocean course about spinning up a secure server now. I'm still collecting interest for this course so [let me know if you're interested](https://forms.gle/NzDo77cSkpf58hDC7).

On another note...

## Hiring an assistant

I'm finally ready to hire an assistant to help me with some administrative work. You can find more details [here](https://zellwk.com/job/assistant/) if you're interested.
