# OpenMOSS website

Source for the [OpenMOSS website](https://openmoss.ai/), including the team overview, publications, and research pages.

**Looking for models or code?** Browse [OpenMOSS on GitHub](https://github.com/OpenMOSS) or [model downloads on Hugging Face](https://huggingface.co/OpenMOSS-Team).

## Explore

- [Team website](https://openmoss.ai/)
- [MOSS-VL](https://openmoss.ai/MOSS-VL/) — long-form and real-time video understanding
- [MOSS-Audio](https://openmoss.ai/MOSS-Audio/) — speech, sound, and music understanding
- [EasyWAM](https://openmoss.ai/EasyWAM/) — World Action Model training and evaluation

## Preview locally

From the repository root, serve the static files with Python 3:

```bash
python -m http.server 8000
```

Open [localhost:8000](http://localhost:8000/). The main page is in [`index.html`](index.html), shared files are in [`assets/`](assets/), and articles are in [`blog/`](blog/). Backend setup is documented in [`worker/README.md`](worker/README.md).

## Contribute

Use this repository's [Issues](https://github.com/OpenMOSS/OpenMOSS.github.io/issues) for website problems and pull requests for corrections. Please include the affected page URL and a description of the change. For a model or research implementation, use the corresponding project repository.
