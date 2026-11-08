# WEB-024 — Simplify the persistent helm

Authorized by the user's 2026-11-07 instruction to add and execute focused
UI/control simplifications. Implement after WEB-016 publication, on its own branch.

Observed friction: ten persistent helm buttons occupy three rows in the broad
mobile view; secondary trim/reset/sound actions compete with the sailing scene.
The prototype's narrow target repair demonstrated the cost of cramming every
control into a small panel. Auto trim already handles the initial sailing mode.

Small scope: keep four steering directions and Spill directly available; put
manual trim, auto trim, Reset and Sound behind one labelled More controls
(nonmodal disclosure). Preserve every keyboard shortcut and action. Keep usable
44px targets, clear expanded state, correct focus return, and release held intent
when collapsing so hidden controls cannot leave steering/trim active. Retain
wind guidance, scanner/content/local harbours and camera inset measurement.
No physics, navigation, content, dependencies or domain changes.

Acceptance: default compact panel measurably reduces covered height on mobile;
all actions still reachable by keyboard/touch; closed advanced controls stay out
of tab order while shortcuts work; pause/reset/reduced/fallback and local drawer
states remain coherent. Browser-check desktop/phone/320px/landscape, actual held
inputs and disclosure focus; full verify and independent exact-head/base review,
protected MR and exact-SHA publication/live proof. Root owns integration/release;
UI worker owns main/styles and relevant tests, exclusive paths agreed on launch.

Status: Backlog, explicitly in the assigned batch; dependency WEB-016 publication.
