import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useSpring, animated } from "@react-spring/web";

import styles from "./styles.module.css";
import AnimatedSvg from "../animatedSvg";

export default function HomepageHeader(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const [active, setActive] = useState<boolean>(false);

  // Animasi blob halus
  const { x } = useSpring({
    config: { duration: 3800 },
    x: active ? 1 : 0,
  });

  useEffect(() => {
    setActive(true);
    const id = setInterval(() => setActive((v) => !v), 3800);
    return () => clearInterval(id);
  }, []);

  const profileSrc = useBaseUrl("/img/fajri.jpg"); // taruh fotomu di static/img/profile.jpg
  // const cvHref = useBaseUrl("/files/Fajeri-CV.pdf"); // optional, static/files/Fajeri-CV.pdf

  return (
    <header className={clsx("hero", styles.heroBanner)}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 }, py: { xs: 4, md: 6 } }}>
        <Grid container alignItems="center" spacing={4}>
          {/* Foto & bubble hi */}
          <Grid item xs={12} md={4} className={styles.photoCol}>
            <div className={styles.photoWrap}>
              <img
                src={profileSrc}
                alt="Portrait of Ahmad Khoirul Fajeri"
                className={styles.photo}
                loading="eager"
              />
              <div className={styles.bubbleWrap} aria-hidden="true">
                <AnimatedSvg />
              </div>
            </div>
          </Grid>

          {/* Blob background */}
          <svg
            width="1000"
            height="1300"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            className={styles.svgAnimated}
            aria-hidden="true"
          >
            <animated.path
              transform="translate(420 320)"
              fill="currentColor"
              opacity=".09"
              d={x.to({
                range: [0, 1],
                output: [
                  "M122.4 -230.4C149.8 -196.2 157.2 -145.6 177.9 -104.5C198.7 -63.3 232.8 -31.7 243.5 6.2C254.2 44 241.4 88 220.1 128.1C198.8 168.3 168.9 204.5 130.8 217.3C92.7 230.2 46.3 219.6 4.1 212.5C-38.2 205.4 -76.3 201.9 -103.4 182.7C-130.5 163.5 -146.4 128.6 -162 95.6C-177.6 62.5 -192.8 31.3 -202.2 -5.5C-211.7 -42.2 -215.4 -84.3 -202.7 -122.3C-189.9 -160.3 -160.7 -194 -124.2 -222.9C-87.7 -251.8 -43.8 -275.9 1.8 -279.1C47.5 -282.3 95 -264.5 122.4 -230.4",
                  "M125.6 -199.6C168.2 -192.9 211.8 -170.2 238.2 -134.3C264.7 -98.3 273.8 -49.2 267.8 -3.5C261.7 42.2 240.4 84.3 213.2 119C186.1 153.6 153 180.7 116.5 199.5C80 218.2 40 228.6 4.2 221.4C-31.7 214.2 -63.3 189.4 -96.1 168.4C-128.9 147.5 -162.7 130.5 -186.7 103.1C-210.7 75.7 -224.9 37.8 -233.8 -5.2C-242.8 -48.2 -246.5 -96.3 -231.7 -139.6C-216.9 -182.9 -183.4 -221.4 -141.7 -228.5C-100 -235.7 -50 -211.6 -4.3 -204.2C41.5 -196.9 83 -206.3 125.6 -199.6",
                ],
              })}
            />
          </svg>

          {/* Bio & CTA */}
          <Grid item xs={12} md={8} className={styles.textCol}>
            <h1 className={clsx("hero__title", styles.title)}>{siteConfig.title}</h1>

            <p className={styles.kicker}>Software Engineer & AI Researcher</p>

            <h2 className={styles.subtitle}>
              Fokus pada <b>Multimodal LLM</b>, <b>AIOps</b>, dan solusi <b>Edutech</b> end-to-end
              (Sistem Akademik, Penerimaan Siswa Baru, Website Company profile dan lain lain).
            </h2>

            <ul className={styles.points}>
              <li>Laravel • Python • Nuxt 3 • Tailwind • Nginx</li>
              <li>LangChain • Qwen-VL • ChatGLM • OCR</li>
              <li>VPS & reverse proxy • SSL • caching gateway</li>
            </ul>

            <div className={styles.actions}>
              <Button
                component={Link as any}
                to={'/'}
                variant="contained"
                size="large"
                className={styles.ctaPrimary}
              >
                Download CV
              </Button>

              <Button
                component={Link as any}
                to="/docs/category/about-me"
                variant="outlined"
                size="large"
                className={styles.ctaSecondary}
              >
                View Profile
              </Button>

              <div className={styles.socials}>
                <Link
                  to="https://github.com/akfajricrt"
                  className={styles.iconBtn}
                  aria-label="GitHub Profile"
                >
                  <GitHubIcon fontSize="medium" />
                </Link>

                <Link
                  to="https://www.linkedin.com/akfajri"
                  className={styles.iconBtn}
                  aria-label="LinkedIn Profile"
                >
                  <LinkedInIcon fontSize="medium" />
                </Link>
              </div>
            </div>

            <div className={styles.metrics}>
              <div><span>10K+</span> LOC shipped</div>
              <div><span>5+</span> deployments</div>
              <div><span>3</span> research tracks</div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </header>
  );
}
