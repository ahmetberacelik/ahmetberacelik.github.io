---
lang: "en"
projectSlug: "zuga-ida"
title: "ZUGA-İDA"
tagline: "Autonomous unmanned surface vehicle"
year: "2026–"
meta: "Team project · Software team manager · TEKNOFEST 2026 finalist"
summary: "ZUGA-İDA is an unmanned surface vehicle we built to complete a competition course with no human input. The boat spots buoys with its camera, steers around obstacles, and finally finds the target buoy of the assigned color and carries out a kamikaze run on it."
tags:
  - "Python"
  - "YOLO"
  - "ArduPilot"
  - "MAVLink"
  - "Gazebo"
repos: []
facts:
  - label: "Role"
    value: "Software team manager"
  - label: "Result"
    value: "TEKNOFEST 2026 finalist"
  - label: "Perception"
    value: "YOLO, camera"
  - label: "Simulation"
    value: "Gazebo, ArduPilot SITL"
  - label: "Communication"
    value: "MAVLink"
  - label: "Hardware"
    value: "Jetson Orin Nano"
media:
  - type: "video"
    src: "/media/zuga-ida-deneme-2026-08-12-ilk10sn.mp4"
    alt: "First water trial: boat steering between yellow buoys"
    captionTitle: "First water trial · 12.08.2026"
    captionSub: "Avoiding buoys"
  - type: "video"
    src: "/media/zuga-ida-yarisma-kamera-yolo-ilk10sn.mp4"
    alt: "Onboard camera during competition run: YOLO buoy detection boxes"
    captionTitle: "Competition · Onboard camera"
    captionSub: "Buoy detection with YOLO"
  - type: "image"
    src: "zuga-ida-atolye-3-web.jpg"
    alt: "ZUGA-İDA unmanned surface vehicle, angled top view"
    captionTitle: "ZUGA-İDA"
    captionSub: "Vehicle, close view"
  - type: "image"
    src: "zuga-ida-atolye-1.jpg"
    alt: "ZUGA-İDA unmanned surface vehicle in the workshop"
    captionTitle: "ZUGA-İDA"
    captionSub: "Workshop"
  - type: "image"
    src: "zuga-ida-atolye-2.jpg"
    alt: "ZUGA-İDA hull and hardware in the workshop"
    captionTitle: "ZUGA-İDA"
    captionSub: "Hull and hardware"
technicalDetailsTitle: "Technical details"
technicalDetails:
  - "Communication: the Jetson and the Matek H743 talk MAVLink over a serial link. The boat runs in GUIDED mode; every 100 ms we send a waypoint 10-30 m ahead in the desired direction and ArduPilot's own controller does the steering. We switched to this after our first approach, velocity commands, made the boat back up instead of turning."
  - "Heading: the GPS bearing is corrected by the potential field output, capped at ±45°, and the LIDAR runs a final safety check."
  - "Potential field: each buoy's influence falls off with the square of its distance and is weighted by YOLO's detection confidence, with different coefficients for boundary, obstacle and target buoys. There is no special rule for moving between course sections: when the surroundings change, the method adapts on its own; only the last section switches to a target-search mode."
  - "A design lesson: to stop collisions we first added a rule that blocked the angles in front of a buoy (a \"forbidden cone\"). Tests showed it overrode the GPS goal and pushed the boat off the course, so we removed it and replaced it with three softer mechanisms that only correct the heading and never override it. Our rule since then: a rule may correct the goal, never override it."
  - "Vision: the YOLO model is trained color-agnostic; color is decided in a separate layer from the hue angle in CIE Lab color space, which makes it less sensitive to changing light. Vision runs at about 24 frames per second on the Jetson."
  - "Distance comes from a single camera using the pinhole model: the known buoy diameter and the focal length we measured, divided by the width of the detection box. Below 5 m the system switches to LIDAR."
  - "LIDAR: after noticing false close-range readings, we traced them in controlled tests to an internal echo in the sensor's high-density mode and switched to standard mode. Resolution halved, but the readings became reliable."
  - "Kamikaze confirmation: contact with the target is confirmed only when at least two of three independent signals agree: LIDAR distance, the gap between commanded and actual speed, and the boat no longer making progress."
  - "What we chose not to add: we evaluated a small vision-language model (VLM) to double-check colors. Our research showed these models fail in exactly the cases where our own method struggles, so it would not act as a true second opinion, and we shelved it."
  - "Testing: unit and integration tests (1,522), end-to-end simulation of every course section, and hardware-in-the-loop tests with the real Jetson driving ArduPilot. Business logic is never mocked, and mutation testing (deliberately planting bugs in the code) checks that the tests actually catch failures. Simulation and the real boat keep separate parameter files."
order: 1
featured: true
---

## My contribution

- Managed a seven-person software team: split the work, made technical decisions together with the team, and tracked progress through regular reports.
- Developed the vision pipeline that detects buoys with YOLO, tells their colors apart and estimates their distance from the camera image.
- Wrote the software that decides how the boat avoids buoys and turns towards the target, using a potential field method.
- Built the virtual course where we tested everything before the boat touched water, with Gazebo and ArduPilot SITL, and put together an automated test suite of 1,522 tests.
- Set up the MAVLink link between the boat's computer and its flight controller.

## How it works

- A camera, a LIDAR and GPS sense the boat's surroundings.
- The on-board computer (Jetson Orin Nano) uses this information to decide where to go.
- A flight controller running ArduPilot (Matek H743) drives the motors and the rudder. The computer only tells it "head this way"; the controller knows how to drive the motors.
- Avoidance works as a potential field: think of the buoys as magnets. Obstacle and boundary buoys push the boat away, the target buoy pulls it in, and a nearby buoy acts far more strongly than a distant one. The boat follows the sum of these forces, so the same method works on every part of the course.

## In the field

- In the first open-water test on 12 August 2026, the boat avoided the buoys on its own and completed the kamikaze run on the red target buoy.
- On race day the motor controllers (ESCs) failed. We had to race on spare parts without calibrating them; the boat ran too fast and hit the wall at the edge of the course.
- For the 2027 season we continue with the same team, adding redundant motor controllers, shore and wall awareness, and a new camera.
