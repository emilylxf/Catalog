import React, { useState, useCallback, useEffect } from "react";
import CoursesWrapper from "../../components/CoursesWrapper";
import CourseItem from "../../components/CourseItem";
import axios from "axios";
import { Container, Row, ListGroup } from "react-bootstrap";
import Filter from "./Filter";
import CatalogDescription from "../../components/CatalogDescription";
import Loading from "../../components/Loading";

function Catalog() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [specificCourse, setSpecificCourse] = useState({});
  const [filterInfo, setFilterInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);

  String.prototype.splice = function (idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
  };

  const fuzzyQuery = useCallback((courses, keyWord) => {
    var plus = [];
    for (let charIndex = 0; charIndex < keyWord.length; charIndex++) {
      if (keyWord[charIndex] === "+") {
        plus.push(charIndex);
      }
    }
    var reverseIndex = keyWord.length;
    //Finds case for ++, change it to \+\+
    while (reverseIndex > 0) {
      if (keyWord[reverseIndex] !== "+") {
        reverseIndex--;
      } else {
        keyWord = keyWord.splice(reverseIndex, 0, "\\");
      }
    }
    let reg = new RegExp(keyWord, "i");
    let arr = [];
    for (let i = 0; i < courses.length; i++) {
      if (reg.test(courses[i].courseName)) {
        arr.push(courses[i]);
      }
    }
    return arr;
  }, []);

  const coursesFilter = (input) => {
    setSpecificCourse({});
    const keyWord = input.trim().replace(" ", "").replace(/[\\]/g, "");
    const filteredClasses = fuzzyQuery(courses, keyWord);
    setFilteredCourses(filteredClasses);
  };

  useEffect(async () => {
    localStorage.clear();
    //do https requrest
    const allCourses = [];
    axios
      .get(
        "https://fhda-api-test.azurewebsites.net/course_list?year=2021&quarter=Summer"
      )
      .then((res) => {
        localStorage.setItem(
          //This string can be obtained from API later, so I hardcode it here
          '{"campus":"DeAnza","quarter":"Summer","year":"2021"}',
          JSON.stringify(res.data)
        );
        for (const key in res.data) {
          const courseObj = res.data[key];
          let course = {
            key: key,
            courseName: courseObj.courseTitle,
            courseNum: courseObj.courseNum,
            unit: +courseObj.numCredit,
          };
          allCourses.push(course);
        }
        const cache_list = [
          { campus: "DeAnza", quarter: "Summer", year: "2021" },
        ];
        localStorage.setItem("cache_list", JSON.stringify(cache_list));
        localStorage.setItem(
          '{"campus":"DeAnza","quarter":"Summer","year":"2021"}'.concat(
            "cards"
          ),
          JSON.stringify(allCourses)
        );
        setCourses(allCourses);
        setFilteredCourses(allCourses);
        setFilterInfo({ campus: "DeAnza", quarter: "Summer", year: "2021" });
        setIsLoading(false);
      });
  }, []);

  const clearCardsHandler = () => {
    setIsLoading(true);
    setSpecificCourse({});
  };

  const filterHandler = (filter_key, filter_value) => {
    var allCourses = [];
    const cache = JSON.parse(localStorage.getItem(JSON.stringify(filter_key)));
    if (!cache) {
      for (const key in filter_value.data) {
        const courseObj = filter_value.data[key];
        let course = {
          key: key,
          courseName: courseObj.courseTitle,
          courseNum: courseObj.courseNum,
          unit: +courseObj.numCredit,
        };
        allCourses.push(course);
      }
      var cache_list = JSON.parse(localStorage.getItem("cache_list"));
      if (cache_list.length > 8) {
        localStorage.removeItem(cache_list[0]);
        localStorage.removeItem(cache_list[0].concat("cards"));
        cache_list = cache_list.shift();
      }

      localStorage.setItem(
        JSON.stringify(filter_key),
        JSON.stringify(filter_value.data)
      );
      //var cache_list = JSON.parse(localStorage.getItem("cache_list"));
      cache_list.push(filter_key);
      localStorage.setItem("cache_list", JSON.stringify(cache_list));
      localStorage.setItem(
        JSON.stringify(filter_key).concat("cards"),
        JSON.stringify(allCourses)
      );
    } else {
      allCourses = JSON.parse(
        localStorage.getItem(JSON.stringify(filter_key).concat("cards"))
      );
    }
    setFilterInfo(filter_key);
    setCourses(allCourses);
    setFilteredCourses(allCourses);
    setIsLoading(false);
  }; // can be refactored

  const searchCourseHandler = (event) => {
    coursesFilter(event.target.value);
  };

  const clickCourseItemHandler = (key) => {
    const allCourses = JSON.parse(
      localStorage.getItem(JSON.stringify(filterInfo))
    );
    setSpecificCourse(allCourses[key]);
  };

  let courseCardsContent = <p>There are no courses matching your filters.</p>;

  if (isLoading) {
    courseCardsContent = (
      <Loading
        type="spinningBubbles"
        color="#8f0505"
        height="15%"
        width="15%"
        className={"loading"}
      />
    );
  } else if (filteredCourses.length !== 0) {
    courseCardsContent = filteredCourses.map((course) => {
      return (
        <ListGroup.Item>
          <CourseItem
            key={course.key}
            uid={course.key}
            courseName={course.courseName}
            courseNum={course.courseNum}
            unit={course.unit}
            handlerClick={clickCourseItemHandler}
          />
        </ListGroup.Item>
      );
    });
    courseCardsContent = (
      <ListGroup>
        {courseCardsContent}
      </ListGroup>
    );
  }

  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <CoursesWrapper>
            <Filter
              filterHandler={filterHandler}
              searchCourseHandler={searchCourseHandler}
              clearCardsHandler={clearCardsHandler}
            />
          </CoursesWrapper>
          <CoursesWrapper>{courseCardsContent}</CoursesWrapper>
          <CoursesWrapper>
            {Object.keys(specificCourse).length !== 0 && (
              <CatalogDescription course={specificCourse} />
            )}
          </CoursesWrapper>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default Catalog;
