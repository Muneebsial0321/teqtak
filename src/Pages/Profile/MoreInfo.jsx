import React, { Fragment, useEffect, useState } from 'react';
import { FaAngleDown } from "react-icons/fa";
import { REACT_APP_API_BASE_URL } from '../../ENV';
const entrepreneurs = [
  { name: "Tech Entrepreneur" },
  { name: "Biotech Entrepreneur" },
  { name: "Food Entrepreneur" },
  { name: "Fashion Entrepreneur" },
  { name: "Service-Based Entrepreneur" },
  { name: "Social Entrepreneur" },
  { name: "E-Commerce Entrepreneur" },
  { name: "Real Estate Entrepreneur" },
  { name: "Educational Entrepreneur" },
  { name: "Reviews" },
  { name: "Videos" },
  { name: "Duration" },
  { name: "Funds" },
  { name: "Experience" },
  { name: "Strategy" },
  { name: "Exit" },
  { name: "Results" },
  { name: "Market" },
  { name: "Product" },
  { name: "Team" },
];

const entrepreneurs2 = [
  ['Software development', 'Hardware innovation', 'Artificial intelligence', 'Cybersecurity', 'Internet of Things', 'Other'],
  ['Drug development', 'Medical devices', 'Genetic engineering', 'Bioinformatics', 'Other'],
  ['Restaurants', 'Food manufacturing', 'Catering services', 'Specialty foods', 'Health-focused foods', 'Other'],
  ['Clothing design', 'Accessories', 'Sustainable fashion', 'Apparel manufacturing', 'Online retail'],
  ['Consulting', 'Marketing services', 'Event planning', 'Financial services'],
  ['Nonprofit organizations', 'Social enterprises', 'Community development', 'Environmental conservation', 'Ethical business practices', 'Other'],
  ['Online retail', 'Dropshipping', 'Subscription-based services', 'Digital products', 'Marketplace platforms', 'Other'],
  ['Property development', 'Real estate investment', 'Property management', 'Real estate technology', 'Commercial real estate', 'Other'],
  ['Online courses', 'Educational technology', 'Tutoring services', 'Language schools', 'Educational consulting', 'Other'],
  ['All', 'Top Reviews', 'Other'],
  ['Investor', 'Entrepreneur', 'Viewer', 'Other'],
  ['15 Mins', '30 Mins', '1 hour', '+1 hour', 'Other'],
  ['$ 1M', '$ 5M', '$ 15M', '$ 20M'],
  ['1 year', '3 year', '5 year', '7 year', '10+ year'],
  ['Expansion', 'Marketing', 'R&D', 'Operations', 'Debt repayment'],
  ['IPO', 'Strategic partnership', 'Merger', 'No specific exit plan', 'Other'],
  ['Acquisition', 'IPO', 'Merger', 'Strategic partnership', 'No specific exit plan'],
  ['Local', 'Regional', 'National', 'International', 'Global'],
  ['Software', 'Hardware', 'Services', 'Subscription-Based', 'Consumer goods'],
  ['Small', 'Medium', 'Large', 'Experienced', 'Specialized'],
];

const MoreInfo = ({role, userPk }) => {
  const userID = userPk;
 
  console.log("detail ", role);
  const [selectedindex, setSelectedindex] = useState(null);
  const [filter, setFilter] = useState();
  const [data, setData] = useState([]); // Added state for API response

  console.log("userID", userID);

  const getUserId = () => {
    const str = document.cookie;
    const userKey = str.split('=')[1];
    return userKey;
  };

  const handleShow = (index) => {
    setSelectedindex(selectedindex === index ? null : index);
  };

  const _onChange_ = (e) => {
    setFilter((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const profileFilters = async () => {
    try {
      const response = await fetch(`${REACT_APP_API_BASE_URL}/qna/${role}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const d = await response.json();
      console.log("response for getting questions", d);
      setData(d); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
console.log("data", data);
  useEffect(() => {
    profileFilters();
  }, []); // Empty dependency array to run only once when the component mounts

  const saveButton = getUserId() === userID;

  return (
    <Fragment>
      <div className="flex flex-wrap gap-4 justify-between">
        {data.map((entrepreneur, index) => (
          <div
            key={index}
            onChange={_onChange_}
            className={`relative w-full sm:w-[48%] md:w-[31%] lg:w-[23%]`}
            style={{ margin: '10px', padding: '10px', cursor: 'pointer' }}
          >
            <div className="flex items-center gap-3 md:gap-5 justify-between" onClick={() => handleShow(index)}>
              <p className="text-sm md:text-lg font-semibold mb-2 md:mb-3 mt-2 md:mt-3">{entrepreneur.question}</p>
              <FaAngleDown />
            </div>
            {selectedindex === index && (
              <div className="w-full py-3 md:py-5 mt-2" style={{ left: "0" }}>
                {entrepreneur.options?.map((elm, ind) => (
                  <div key={ind} className="flex mt-1 py-1 md:py-2 items-center">
                    <input type="checkbox" className="me-2" />
                    <p className="text-sm md:text-base">{elm}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

 
    </Fragment>
  );
};

export default MoreInfo;
