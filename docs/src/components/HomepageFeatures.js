import React from "react";
import clsx from "clsx";
import styles from "./HomepageFeatures.module.css";

const FeatureList = [
  {
    title: "Easy to Use",
    Svg: require("../../static/img/undraw_docusaurus_mountain.svg").default,
    description: <>Nobe packs a punch</>,
  },
  {
    title: "Microservices to Go",
    Svg: require("../../static/img/undraw_docusaurus_tree.svg").default,
    description: <>Focus on What Matters</>,
  },
  {
    title: "Powered by NodeJS",
    Svg: require("../../static/img/undraw_docusaurus_react.svg").default,
    description: <>Everything from Node works in Nobe</>,
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
