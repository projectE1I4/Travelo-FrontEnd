import { useState, useEffect } from 'react';
import { useCourse } from '../../contexts/CourseContext';
import RegionSelectModal from '../../components/courseCustom/RegionSelectModal';
import CourseSidebar from '../../components/courseCustom/CourseSidebar';
import { useLocation, useNavigate } from 'react-router-dom';

const CourseCustomPage = () => {
  const { updateFilters, selectedRegion, setSelectedRegion } = useCourse();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedRegion) {
      updateFilters({ area: selectedRegion });
    }
  }, [selectedRegion]);

  useEffect(() => {
    if (location.state?.fromCoursePage) {
      setIsModalOpen(false);
    }
  }, [location.state]);

  const handleRegionSelect = (regionCode) => {
    setSelectedRegion(regionCode);
    setIsModalOpen(false);
    navigate(location.pathname, {
      replace: true,
      state: { fromCoursePage: true },
    });
  };

  return (
    <div className="grid-container">
      {isModalOpen && <RegionSelectModal onSelect={handleRegionSelect} />}
      {!isModalOpen && <CourseSidebar />}
    </div>
  );
};

export default CourseCustomPage;
