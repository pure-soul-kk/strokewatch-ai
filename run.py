"""
run.py — Unified Launcher for StrokeWatch AI
Supports:
  python run.py --mode gradio   (Default: launches Gradio command center on port 7860)
  python run.py --mode flask    (Launches Flask REST API on port 5000)
  python run.py --mode all      (Runs both Gradio on 7860 and Flask on 5000)
"""

import sys
import os
import argparse
import threading

# Ensure local packages directory is prioritized
_pkg_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'packages')
if os.path.exists(_pkg_dir) and _pkg_dir not in sys.path:
    sys.path.insert(0, _pkg_dir)

def run_gradio(port=7860):
    import app
    print(f"\n=======================================================")
    print(f"🚀 Launching StrokeWatch AI Gradio Interface on port {port}...")
    print(f"👉 Local URL: http://localhost:{port}")
    print(f"=======================================================\n")
    demo = app.create_ui()
    demo.launch(server_name="0.0.0.0", server_port=port, share=False)

def run_flask(port=5000):
    import flask_app
    print(f"\n=======================================================")
    print(f"🚀 Launching StrokeWatch AI Flask Server on port {port}...")
    print(f"👉 Local URL: http://localhost:{port}")
    print(f"=======================================================\n")
    flask_app.app.run(host="0.0.0.0", port=port, debug=False)

def main():
    parser = argparse.ArgumentParser(description="StrokeWatch AI Unified Runner")
    parser.add_argument(
        "--mode",
        choices=["gradio", "flask", "all"],
        default="gradio",
        help="Service mode to run (default: gradio)"
    )
    parser.add_argument("--port", type=int, default=None, help="Port to run on")
    args = parser.parse_args()

    if args.mode == "gradio":
        port = args.port or 7860
        run_gradio(port=port)
    elif args.mode == "flask":
        port = args.port or 5000
        run_flask(port=port)
    elif args.mode == "all":
        flask_port = 5000
        gradio_port = 7860
        t = threading.Thread(target=run_flask, args=(flask_port,), daemon=True)
        t.start()
        run_gradio(port=gradio_port)

if __name__ == "__main__":
    main()
