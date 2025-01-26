import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router"; // Import useNavigate

const Game = () => {
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);
    const [misses, setMisses] = useState(0);
    const [gameInterval, setGameInterval] = useState(null);
    const beads = useRef([]);
    const boxPinkPosX = useRef(40);
    const boxBluePosX = useRef(140);
    const boxWidth = 100;
    const boxHeight = 40;
    const charmRadius = 20;
    const gameOver = useRef(false); // Track game-over state
    const missesRef = useRef(misses); // Ref to track misses synchronously
    const navigate = useNavigate(); // Initialize navigate

    // Sync missesRef with misses state
    useEffect(() => {
        missesRef.current = misses;
    }, [misses]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        class Bead {
            constructor(x, y, type) {
                this.x = x;
                this.y = y;
                this.dy = 1;
                this.type = type;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, charmRadius, 0, Math.PI * 2);
                ctx.fillStyle = this.type === "blue" ? "#91bfff" : "#ff9891";
                ctx.fill();
                ctx.closePath();
            }

            update() {
                this.y += this.dy;
            }

            checkOverlap(boxX, boxColor) {
                const beadBottom = this.y + charmRadius;
                const boxTop = canvas.height - boxHeight;
                if (
                    beadBottom >= boxTop &&
                    this.type === boxColor &&
                    this.x >= boxX &&
                    this.x <= boxX + boxWidth
                ) {
                    return true;
                }
                return false;
            }
        }

        const createBead = () => {
            const x = Math.random() * (canvas.width - charmRadius * 2) + charmRadius;
            const type = Math.random() < 0.5 ? "pink" : "blue";
            beads.current.push(new Bead(x, 0, type));
        };

        const drawBox = (x, color) => {
            ctx.beginPath();
            ctx.rect(x, canvas.height - boxHeight, boxWidth, boxHeight);
            ctx.strokeStyle = color;
            ctx.stroke();
            ctx.closePath();
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drawBox(boxPinkPosX.current, "rgba(255, 10, 0, 0.5)");
            drawBox(boxBluePosX.current, "rgba(0, 10, 255, 0.5)");

            beads.current.forEach((bead, index) => {
                bead.update();
                bead.draw();

                if (
                    bead.checkOverlap(boxPinkPosX.current, "pink") ||
                    bead.checkOverlap(boxBluePosX.current, "blue")
                ) {
                    setScore((prev) => prev + 1);
                    beads.current.splice(index, 1);
                } else if (bead.y - charmRadius > canvas.height) {
                    setMisses((prev) => prev + 1);
                    beads.current.splice(index, 1);
                } else if (
                    bead.checkOverlap(boxPinkPosX.current, "blue") ||
                    bead.checkOverlap(boxBluePosX.current, "pink")
                ) {
                    setMisses((prev) => prev + 1);
                    beads.current.splice(index, 1);
                }

                if (missesRef.current >= 10 && !gameOver.current) {
                    gameOver.current = true; // Set game-over flag
                    clearInterval(gameInterval);
                    navigate("/ItemCreate", { state: { score } }); // Redirect with score
                }
            });

            if (Math.random() < 0.008) {
                createBead();
            }
        };

        const handleMouseMove = (event) => {
            const canvasRect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - canvasRect.left;
            boxPinkPosX.current = mouseX - boxWidth - 10;
            boxBluePosX.current = mouseX + 10;
        };

        canvas.addEventListener("mousemove", handleMouseMove);

        const interval = setInterval(() => {
            draw();
        }, 10);
        setGameInterval(interval);

        return () => {
            canvas.removeEventListener("mousemove", handleMouseMove);
            clearInterval(interval);
        };
    }, [navigate, score]);

    return (
        <div style={{ textAlign: "center", marginTop: "2em" }}>
            <canvas
                id="canvas"
                ref={canvasRef}
                width="500"
                height="300"
                style={{ background: "#ffeeed", display: "block", margin: "auto" }}
            ></canvas>
            <p>
                Score: <span>{score}</span> | Misses: <span>{misses}</span>
            </p>
        </div>
    );
};

export default Game;
