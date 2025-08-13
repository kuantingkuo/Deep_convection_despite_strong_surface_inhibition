# Instruction

Code to reproduce figures from the paper  
*"Deep convection despite strong surface inhibition — examples with cloud-resolving and anelastic convective entity models."*

Mostly GrADS scripts (`*.gs`) with one Python script (`*.py`).
Parts of the code rely on functions from my other repo: [grads-library](https://github.com/kuantingkuo/grads-library).

## Data

Data can be downloaded from Zenodo:  
[https://doi.org/zenodo-link](https://doi.org/10.5281/zenodo.16792279)

## Setup

- Update `MODEL_ROOT` in the scripts to point to your local data folder.  
- Set the environment variable `GASCRP` to your local `grads-library` path.

## Usage

- Run the GrADS scripts named like `Fig1a.gs` or Python code like `Fig1d.py` to generate the figures.  
- Some GrADS scripts start with a line like `grads -a 2` to open GrADS with the correct aspect ratio.

---
