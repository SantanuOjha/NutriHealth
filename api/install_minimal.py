#!/usr/bin/env python
"""
Minimal installation script for NutriHealth backend.
This script installs only the essential dependencies needed for the simplified backend.
"""

import subprocess
import sys
import os

def install_package(package):
    print(f"Installing {package}...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", package])
        return True
    except subprocess.CalledProcessError:
        print(f"Failed to install {package}")
        return False

def main():
    print("Installing minimal dependencies for NutriHealth backend...")
    
    # First, upgrade setuptools and wheel
    install_package("--upgrade setuptools")
    install_package("--upgrade wheel")
    
    # Essential packages
    essential_packages = [
        "flask==2.3.3",
        "flask-cors==4.0.0",
        "python-dotenv==1.0.0",
        "google-generativeai==0.3.1"
    ]
    
    success = True
    for package in essential_packages:
        if not install_package(package):
            success = False
    
    if success:
        print("\nMinimal installation completed successfully!")
        print("You can now run the simplified backend with:")
        print("python app_simple.py")
    else:
        print("\nSome packages failed to install.")
        print("Please check the error messages above and try to resolve the issues.")
        print("You may need to install these packages manually.")

if __name__ == "__main__":
    main() 