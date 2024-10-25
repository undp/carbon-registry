import { Button, Col, Collapse, CollapseProps, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import i18next from 'i18next';
import sliderLogo from '../../Assets/Images/logo-slider.png';
import undpLogo from '../../Assets/Images/undp1.webp';
import EBRD from '../../Assets/Images/EBRD.webp';
import EBRDff from '../../Assets/Images/EBRD.png';
import UNFCCC from '../../Assets/Images/UNFCCC.webp';
import UNFCCCff from '../../Assets/Images/UNFCCC.png';
import IETA from '../../Assets/Images/IETA.webp';
import IETAff from '../../Assets/Images/IETA.png';
import ESA from '../../Assets/Images/ESA.webp';
import ESAff from '../../Assets/Images/ESA.png';
import WBANK from '../../Assets/Images/WBANK.webp';
import WBANKff from '../../Assets/Images/WBANK.png';
import forestfall from '../../Assets/Images/forestnew.png';
import resources from '../../Assets/Images/resources.webp';
import resourcesfall from '../../Assets/Images/resources.png';
import LayoutFooter from '../../Components/Footer/layout.footer';
import { ImgWithFallback } from '@undp/carbon-library';
import './homepage.scss';
import { GlobeAmericas, ShieldCheck, CartCheck, Briefcase } from 'react-bootstrap-icons';
// import { ImgWithFallback } from '../../Components/ImgwithFallback/imgWithFallback';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';

const Homepage = () => {
  const { i18n, t } = useTranslation(['common', 'homepage']);
  const navigate = useNavigate();
  const [Visible, setVisible] = useState(true);

  const controlDownArrow = () => {
    if (window.scrollY > 150) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const handleClickScroll = () => {
    const element = document.getElementById('scrollhome');
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (localStorage.getItem('i18nextLng')!.length > 2) {
      i18next.changeLanguage('en');
    }
    window.addEventListener('scroll', controlDownArrow);
    return () => {
      window.removeEventListener('scroll', controlDownArrow);
    };
  }, []);
  return (
    <div className="homepage-container">
      <Row>
        <Col md={24} lg={24} flex="auto">
          <div className="homepage-img-container image-container">
            <Row>
              <Col md={18} lg={21} xs={17} flex="auto">
                <div className="homepage-header-container">
                  <div className="logo">
                    <img src={sliderLogo} alt="slider-logo" />
                  </div>
                  <div>
                    <div style={{ display: 'flex' }}>
                      <div className="title">{'CARBON'}</div>
                      <div className="title-sub">{'REGISTRY'}</div>
                    </div>
                    <div className="country-name">
                      {process.env.REACT_APP_COUNTRY_NAME || 'CountryX'}
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={6} lg={3} xs={7} flex="auto">
                <div className="homepage-button-container">
                  <div className="button">
                    <Button type="primary" onClick={() => navigate('/login')}>
                      SIGN IN
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <div className="text-ctn">
                <span>
                  {t('homepage:national')} {t('homepage:carbon')} <br />
                  {t('homepage:registry')}
                </span>
                <div className="subhome">{t('homepage:lorem')}</div>
              </div>
            </Row>
            <Row>
              {Visible && (
                <nav className={'arrows'}>
                  <svg onClick={handleClickScroll}>
                    <path className="a1" d="M0 0 L30 32 L60 0"></path>
                    <path className="a2" d="M0 20 L30 52 L60 20"></path>
                    <path className="a3" d="M0 40 L30 72 L60 40"></path>
                  </svg>
                </nav>
              )}
            </Row>
          </div>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col md={24} lg={24} flex="auto">
          <div className="homepage-content-containerwhite">
            <div id="scrollhome" className="title">
              Our Vision
            </div>
            <div className="homepagebody">
              <div className="homepagebody_text">
                UNDP has developed an
                <strong> open-source National Carbon Registry </strong>
                to help countries securely issue, manage, trade, and track carbon credits with ease.
                This ensures transparency and data integrity throughout the process, supporting the
                global transition toward a sustainable, low-emission future.
              </div>
              <div className="homepagebody_text">Our platform enables:</div>

              <div className="aboutus_cards-container">
                <Row gutter={[5, 5]} className="aboutus_card-row">
                  <Col xxl={6} xl={6} md={12} className="aboutus_card-col">
                    <div className="aboutus-card-main-container">
                      <Col>
                        <Row className="aboutus_card-row">
                          <div>
                            <GlobeAmericas className="aboutusicon" color="#FFFF" size="60px" />
                          </div>
                        </Row>
                        <Row className="aboutus_card-row">
                          <div className="aboutus-card-title">Governments</div>
                        </Row>
                        <Row>
                          <div className="aboutus-card-text">
                            to implement and manage national carbon markets in alignment with the
                            Paris Agreement.
                          </div>
                        </Row>
                      </Col>
                    </div>
                  </Col>
                  <Col xxl={6} xl={6} md={12} className="aboutus_card-col">
                    <div className="aboutus-card-main-container">
                      <Col>
                        <Row className="aboutus_card-row">
                          <div>
                            <Briefcase className="aboutusicon" color="#FFFF" size="60px" />
                          </div>
                        </Row>
                        <Row className="aboutus_card-row">
                          <div className="aboutus-card-title">Project developers</div>
                        </Row>
                        <Row>
                          <div className="aboutus-card-text">
                            to receive recognition for reducing greenhouse gas emissions while
                            accessing crucial funding for environmental innovations.
                          </div>
                        </Row>
                      </Col>
                    </div>
                  </Col>
                  <Col xxl={6} xl={6} md={12} className="aboutus_card-col">
                    <div className="aboutus-card-main-container">
                      <Col>
                        <Row className="aboutus_card-row">
                          <div>
                            <ShieldCheck className="aboutusicon" color="#FFFF" size="60px" />
                          </div>
                        </Row>
                        <Row className="aboutus_card-row">
                          <div className="aboutus-card-title">Certifiers</div>
                        </Row>
                        <Row>
                          <div className="aboutus-card-text">
                            to efficiently validate and verify emission reduction projects.
                          </div>
                        </Row>
                      </Col>
                    </div>
                  </Col>
                  <Col xxl={6} xl={6} md={12} className="aboutus_card-col">
                    <div className="aboutus-card-main-container">
                      <Col>
                        <Row className="aboutus_card-row">
                          <div>
                            <CartCheck className="aboutusicon" color="#FFFF" size="60px" />
                          </div>
                        </Row>
                        <Row className="aboutus_card-row">
                          <div className="aboutus-card-title">Buyers</div>
                        </Row>
                        <Row>
                          <div className="aboutus-card-text">
                            to access a trustworthy and transparent marketplace for carbon credits.
                          </div>
                        </Row>
                      </Col>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="homepagebody_subtitle">Policy Context</div>
              <div className="homepagebody_text">
                The Paris Agreement, under the UNFCCC, aims to limit global warming to below 2°C,
                with efforts to keep it to 1.5°C by 2100. Article 6 introduces mechanisms for
                countries to cooperate on climate goals through market-based (Articles 6.2 and 6.4)
                and non-market approaches (Article 6.8). All countries must account for any carbon
                credits used or transferred within their Nationally Determined Contributions (NDCs).
              </div>
              <div className="homepagebody_text">
                Digital systems are essential for enabling countries to trade carbon credits and
                secure climate finance transparently and efficiently.
              </div>
              <div className="homepagebody_subtitle">A Digital Public Good</div>
              <div className="homepagebody_text">
                In response to countries’ need for support to deploy reliable, interoperable digital
                systems, the UNDP has created the National Carbon Credit Registry as an open-source
                toolkit that follows the{' '}
                <a href="https://digitalpublicgoods.net/digital-public-goods/" target="_blank">
                  Digital Public Goods Standard
                </a>
                . Countries can access the free source and installation instructions{' '}
                <a href="https://github.com/undp/carbon-registry" target="_blank">
                  from UNDP’s managed Github
                </a>{' '}
                to customize a Registry according to their national needs. This approach helps save
                time, reduce costs, and avoid duplication of effort.
              </div>
              <div className="homepagebody_subtitle">Demo Site</div>
              <div className="homepagebody_text">
                This demonstration site showcases the core functionality of the{' '}
                <strong>Carbon Credit Registry</strong> built on the source code. Governments and
                potential partners working with UNDP can:
                <ul>
                  <li>Request access to the demo site.</li>
                  <li>Schedule a live demonstration.</li>
                  <li>Explore potential collaboration and support.</li>
                </ul>
                For inquiries and to request a demo, please contact{' '}
                <strong>UNDP Digital For Planet</strong> at{' '}
                <a href="mailto:digital4planet@undp.org" target="_blank">
                  digital4planet@undp.org
                </a>
                . Additional technical details are available on GitHub.
              </div>
              <div className="homepagebody_text">
                More technical information can be found on{' '}
                <a href="https://github.com/undp/carbon-registry" target="_blank">
                  Github
                </a>
                .
              </div>
            </div>
            <div className="title">How does it work?</div>
            <div className="homepagebody">
              <div className="homepagebody_text">
                Every country has distinct carbon market policies, processes, and governance
                structures. The Carbon Registry is customizable to accommodate local needs. The demo
                site showcases the general standard steps in every process:
              </div>
              <ul className="homepagebody_text list">
                <li>
                  <strong>Project Registration</strong>: Projects aimed at reducing or removing
                  carbon emissions are registered. Baseline emissions and expected credits are
                  calculated, and ownership is determined.
                </li>
                <li>
                  <strong>Validation by Third Parties </strong>: Independent entities validate and
                  approve the projects, authorizing them for publication in the registry.
                </li>
                <li>
                  <strong>Monitoring & Reporting</strong>: Once projects are implemented, emissions
                  reductions are monitored and reported. Verified carbon credits are issued based on
                  these results.
                </li>
                <li>
                  <strong>Trading & Tracking</strong>: Issued credits can be traded, tracked, and
                  retired within the registry, ensuring proper ownership transfer and preventing
                  double counting.
                </li>
              </ul>
              <div className="homepagebody_subtitle">Issuing Carbon Credits</div>
              <div className="homepagebody_text">
                A key feature of the Carbon Registry is its ability to track issued carbon credits,
                ensuring transparency and accountability in the carbon market. Each verified project
                credit is assigned a unique serial number, based on UNFCCC-CDM methodology. All
                transfers and retirements are immutably recorded, enhancing the efficiency and
                reliability of carbon credit transactions.
              </div>
              <div className="homepagebody_subtitle">Dashboard and Insights</div>
              <div className="homepagebody_text">
                Users can access an interactive dashboard with dynamic data visualizations,
                including graphs, maps, and regional statistics. This provides a clear overview of
                progress and trends, along with a visual timeline of activities for each project,
                showing a detailed history of actions and users involved.
              </div>
              <div className="homepagebody_subtitle">Interoperable and Exportable data</div>
              <div className="homepagebody_text">
                The Carbon Registry's data model is aligned with the CAD Trust Data Model, ensuring
                interoperability. It can also integrate with the ITMO Voluntary Bilateral
                Cooperation Platform, managed by UNDP. An open RESTful API allows for the
                development of innovative transparency tools and seamless integration with other
                external systems.
              </div>
            </div>
            <div className="title">Developed in Partnership with Digital For Climate (D4C)</div>
            <div className="homepagebody">
              <div className="homepagebody_text">
                This software has been developed in partnership with{' '}
                <a
                  href="https://www.theclimatewarehouse.org/work/digital-4-climate"
                  target="_blank"
                >
                  Digital For Climate (D4C)
                </a>
                . D4C is a collaboration between the{' '}
                <a href="https://www.ebrd.com/" target="_blank">
                  European Bank for Reconstruction and Development (EBRD)
                </a>
                ,{' '}
                <a href="https://www.ebrd.com/" target="_blank">
                  United Nations Development Program (UNDP)
                </a>
                ,{' '}
                <a href="https://www.unfccc.int/" target="_blank">
                  United Nations Framework Convention on Climate Change (UNFCCC)
                </a>
                ,{' '}
                <a href="https://www.ieta.org/" target="_blank">
                  International Emissions Trading Association (IETA)
                </a>
                ,{' '}
                <a href="https://www.esa.int/" target="_blank">
                  European Space Agency (ESA)
                </a>
                , and{' '}
                <a href="https://www.worldbank.org/" target="_blank">
                  World Bank Group
                </a>{' '}
                that aims to coordinate respective workflows and create a modular and interoperable
                end-to-end digital ecosystem for the carbon market. The overarching goal is to
                support a transparent, high integrity global carbon market that can channel capital
                for impactful climate action and low-carbon development.
              </div>
              <Row className="undplogocontainer">
                <Col className="gutter-row" xl={5} md={8} sm={24} xs={24}>
                  <ImgWithFallback
                    className="erbd"
                    src={EBRD}
                    fallbackSrc={EBRDff}
                    mediaType="image/webp"
                    alt="EBRD"
                  />
                </Col>
                <Col className="gutter-row" xl={3} md={8} sm={12} xs={12}>
                  <ImgWithFallback
                    className="undp"
                    src={undpLogo}
                    fallbackSrc={undpLogo}
                    mediaType="image/svg"
                    alt="UNDP"
                  />
                </Col>
                <Col className="gutter-row" xl={3} md={8} sm={12} xs={12}>
                  <ImgWithFallback
                    className="unfccc"
                    src={UNFCCC}
                    fallbackSrc={UNFCCCff}
                    mediaType="image/webp"
                    alt="UNFCCC"
                  />
                </Col>
                <Col className="gutter-row" xl={5} md={8} sm={24} xs={24}>
                  <ImgWithFallback
                    className="ieta"
                    src={IETA}
                    fallbackSrc={IETAff}
                    mediaType="image/webp"
                    alt="IETA"
                  />
                </Col>
                <Col className="gutter-row" xl={5} md={8} sm={24} xs={24}>
                  <a href="https://www.esa.int/" target="_blank">
                    <ImgWithFallback
                      className="esa"
                      src={ESA}
                      fallbackSrc={ESAff}
                      mediaType="image/webp"
                      alt="ESAFF"
                    />
                  </a>{' '}
                </Col>
                <Col className="gutter-row" xl={3} md={8} sm={24} xs={24}>
                  <a href="https://www.worldbank.org/" target="_blank">
                    <ImgWithFallback
                      className="wbank"
                      src={WBANK}
                      fallbackSrc={WBANKff}
                      mediaType="image/webp"
                      alt="WBANK"
                    />
                  </a>{' '}
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col md={24} lg={24} flex="auto">
          <div className="homepage-image-content-container">
            <Row>
              <Col className="eligicontent" flex={2} md={22} lg={23}>
                <div className="title">Common questions:</div>
                <div className="homepagebody homepage_accordian_wrapper">
                  <Collapse accordion defaultActiveKey={['1']} className="homepage_accordian">
                    <CollapsePanel
                      header="What is a Carbon Registry?"
                      key="1"
                      className="homepage_collapsepanel"
                    >
                      <div className="collapsetext">
                        A carbon registry acts like a digital logbook, and is used to track and
                        record carbon dioxide (CO2) emissions for organizations, businesses, or
                        individuals. It plays a key role in managing carbon emissions and reducing
                        carbon footprints. By using a carbon registry, emission sources can be
                        identified, and strategies can be implemented to reduce them. This helps
                        combat climate change by cutting greenhouse gas emissions.
                      </div>
                    </CollapsePanel>
                    <CollapsePanel
                      header="How does a Carbon Registry promote transparency and integrity in carbon credits?"
                      key="2"
                      className="homepage_collapsepanel"
                    >
                      <div className="collapsetext">
                        Our carbon registry is built on a foundation of transparency and integrity,
                        ensuring credibility and trust with all stakeholders. We achieve this
                        through the following key practices:
                        <ol>
                          <li>
                            <strong>Scope:</strong> The registry covers all significant greenhouse
                            gas emissions and removals across the country, encompassing all sectors
                            and gases. This comprehensive coverage provides a complete picture of
                            national efforts to manage and reduce carbon emissions.
                          </li>
                          <li>
                            <strong>Transparency:</strong> We ensure full transparency by making all
                            information about emissions and removals publicly available. This
                            includes the disclosure of both direct emissions from our facilities and
                            indirect emissions from activities like business travel or electricity
                            consumption. Additionally, we openly document all emission reduction
                            measures, clearly outlining their expected impact on total emissions. By
                            providing open access to this data, we foster understanding, build
                            trust, and encourage active participation from stakeholders in carbon
                            reduction efforts.
                          </li>
                          <li>
                            <strong>Consistency:</strong> Our carbon registry aligns with
                            internationally recognized accounting rules, methodologies, and
                            guidelines, particularly those provided by the Intergovernmental Panel
                            on Climate Change (IPCC). This ensures that our reporting is consistent,
                            comparable with global standards, and meets international expectations
                            for carbon accounting.
                          </li>
                          <li>
                            <strong>Integrity and Accuracy:</strong> To uphold the accuracy and
                            credibility of our data, the registry undergoes regular reviews and
                            independent validation by third parties. Our transparent data collection
                            process follows established methodologies and employs reliable
                            measurement tools, ensuring the completeness and precision of every
                            report. These rigorous practices guarantee that our emissions data and
                            reduction strategies are both reliable and trustworthy.
                          </li>
                        </ol>
                      </div>
                    </CollapsePanel>
                    <CollapsePanel
                      header="How does a government adopt a National Carbon Registry?"
                      key="3"
                      className="homepage_collapsepanel"
                    >
                      <div className="collapsetext">
                        National governments can adopt and customize the National Carbon Registry
                        using the open-source code. Reusing code can reduce development time and
                        costs by up to 70%. To successfully implement the registry, we recommend
                        having the following in place:{' '}
                        <ul>
                          <li>
                            <strong>Carbon Market Framework:</strong> Ensure a robust carbon market
                            framework has been defined, with an expert to help adapt it to digital
                            processes.
                          </li>
                          <li>
                            <strong>Digital Team:</strong> A local full stack digital team
                            (including product design and development skills) to customize the
                            registry to local needs, install it securely, and ensure smooth
                            operation.
                          </li>
                          <li>
                            <strong>Implementation Task Force:</strong> A dedicated team in
                            government (across both policy areas and IT) to lead the implementation
                            and manage/administer the system once operational. The team will also
                            need to engage users, mobilize usage, and monitor changes in needs.
                            Within the task force, we recommend having a dedicated Project Owner who
                            can make key decisions and maintain pace.{' '}
                          </li>
                          <li>
                            <strong>Maintenance budget and resources:</strong> The digital tool will
                            need maintenance and improvement over time, and we recommend setting
                            aside a sufficient budget and IT resources to maintain and improve the
                            registry after installation.
                          </li>
                        </ul>
                      </div>
                    </CollapsePanel>
                    <CollapsePanel
                      header="What support can UNDP provide?"
                      key="4"
                      className="homepage_collapsepanel"
                    >
                      <div className="collapsetext">
                        The UNDP Digital for Planet team, through your local country office, can
                        offer support in several areas (subject to discussion):
                        <ul>
                          <li>
                            <strong>Resources and Templates:</strong> Access to template workplans,
                            process flows, and other tools to assist in the customization and
                            configuration of the system.
                          </li>
                          <li>
                            <strong>International Expertise:</strong> Support from experts in
                            product management, IT, carbon markets, and policy to provide guidance,
                            ensure quality assurance, and facilitate knowledge transfer
                          </li>
                          <li>
                            <strong>Community of Practice:</strong> Ongoing access to an
                            international community of practice for support and collaboration.
                          </li>
                        </ul>
                      </div>
                    </CollapsePanel>
                    <CollapsePanel
                      header="What types of customizations can be allowed?"
                      key="5"
                      className="homepage_collapsepanel"
                    >
                      <div className="collapsetext">
                        The following customizations have been made by various countries:
                        <ul>
                          <li>
                            <strong>Process Flow:</strong> Adapting the steps and workflow for the
                            carbon market.
                          </li>
                          <li>
                            <strong>User Types:</strong> The categories of users, roles,
                            responsibilities and rights for each in the digital system.
                          </li>
                          <li>
                            <strong>Approval Authorities:</strong> Defining which government bodies
                            approve specific actions and how.
                          </li>
                          <li>
                            <strong>Documentation:</strong> Customizing the types of documents
                            required.
                          </li>
                          <li>
                            <strong>Data Requirements:</strong> Adjusting the data required from
                            developers.
                          </li>
                          <li>
                            <strong>API Integration:</strong> Enabling automated data input/export
                            through APIs to integrate with other local and national systems.
                          </li>
                          <li>
                            <strong>Bilateral Carbon Trading:</strong> Adapting the registry for
                            specific bilateral carbon trading agreements.
                          </li>
                          <li>
                            <strong>Data Hosting & Security:</strong> Customizing data hosting
                            locations, databases, and security protocols to meet the country’s
                            unique requirements.
                          </li>
                        </ul>
                      </div>
                    </CollapsePanel>
                    <CollapsePanel
                      header="Where is data hosted?"
                      key="6"
                      className="homepage_collapsepanel"
                    >
                      <div className="collapsetext">
                        This demo site is hosted on UNDP’s Amazon Web Services (AWS) infrastructure.
                        By using AWS, we leverage Amazon’s Quantum Ledger Database (QLDB), which
                        provides a transparent, immutable, and cryptographically verifiable
                        transaction log, ensuring a reliable and complete history of data changes.
                      </div>
                      <div className="collapsetext">
                        After installation, countries are expected to host and maintain the software
                        independently. There are two main hosting options:
                        <ul>
                          <li>
                            <strong>Cloud Hosting:</strong> Cloud hosting offers flexibility,
                            reliability, and integrated security, along with backup and maintenance
                            features. Hosting on AWS (through an account owned and managed by the
                            country government) allows countries to take full advantage of the
                            Quantum Ledger Database with minimal configuration changes required from
                            the original source code.
                          </li>
                          <li>
                            <strong>Local Hosting:</strong> Countries can choose to host the system
                            on local servers or other cloud platforms to gain more direct control
                            over data and security. In this case, countries will need to manage all
                            configuration, security, backup, and ongoing maintenance based on their
                            local IT environment and security protocols.
                          </li>
                        </ul>
                      </div>
                    </CollapsePanel>
                    <CollapsePanel
                      header="Who can use the source code?"
                      key="7"
                      className="homepage_collapsepanel"
                    >
                      <div className="collapsetext">
                        The tool is developed and maintained by UNDP and is licensed under the GNU
                        Affero General Public License (AGPL-3.0), which permits free use,
                        modification, and sharing of the software.
                      </div>
                      <div className="collapsetext">
                        We kindly ask users to inform us of your usage by contacting{' '}
                        <a href="mailto:digital4planet@undp.org" target="_blank">
                          digital4planet@undp.org
                        </a>{' '}
                        as this helps us track the tool’s impact and guide future improvements.
                      </div>
                      <div className="collapsetext">
                        Under AGPL-3.0, any modifications to the code must be made publicly
                        available by creating a new branch on GitHub. The software cannot be
                        relicensed under more restrictive terms without adhering to the AGPL-3.0
                        guidelines.
                      </div>
                    </CollapsePanel>
                  </Collapse>
                </div>
              </Col>
              <Col flex={3} md={8} lg={8}>
                {/* <ImgWithFallback
                  className="forest-image"
                  src={forestfall}
                  fallbackSrc={forestfall}
                  mediaType="image/webp"
                  alt="forestry"
                /> */}
                {/* <img className="image" src={forest} alt="forest" /> */}
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <LayoutFooter />
    </div>
  );
};

export default Homepage;
