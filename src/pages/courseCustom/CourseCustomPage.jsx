import { useState, useEffect } from 'react';
import { useCourse } from '../../contexts/CourseContext';
import RegionSelectModal from '../../components/courseCustom/RegionSelectModal';
import CourseSidebar from '../../components/courseCustom/CourseSidebar';

const CourseCustomPage = () => {
  const { updateFilters, selectedRegion, setSelectedRegion } = useCourse();
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    if (selectedRegion) {
      updateFilters({ area: selectedRegion });
    }
  }, [selectedRegion]);

  const handleRegionSelect = (regionCode) => {
    setSelectedRegion(regionCode);
    setIsModalOpen(false);
  };

  return (
    <div className="grid-container">
      {isModalOpen && <RegionSelectModal onSelect={handleRegionSelect} />}
      {!isModalOpen && <CourseSidebar />}
    </div>
  );
};

export default CourseCustomPage;
