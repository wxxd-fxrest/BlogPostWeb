import { useEffect, useState } from 'react';

const usePagination = <T>(countPerPage: number) => {
    // state: total object list state
    const [totalList, setTotalList] = useState<T[]>([]);
    // state: view object list state
    const [viewList, setViewList] = useState<T[]>([]);

    // state: current page number state
    const [currentPage, setCurrentPage] = useState<number>(1);

    // state: total page number state
    const [totalPageList, setTotalPageList] = useState<number[]>([1]);

    // state: view page number list state
    const [viewPageList, setViewPageList] = useState<number[]>([1]);

    // state: current section state
    const [currentSection, setCurrentSection] = useState<number>(1);

    // state: total section state
    const [totalSection, setTotalSection] = useState<number>(1);

    // function: view object list extract func
    const setView = () => {
        const FIRST_INDEX = countPerPage * (currentPage - 1); // 0
        const LAST_INDEX =
            totalList.length > countPerPage * currentPage ? countPerPage * currentPage : totalList.length; // 3
        const viewList = totalList.slice(FIRST_INDEX, LAST_INDEX);
        setViewList(viewList);
    };

    // function: view page list extract func
    const setViewPage = () => {
        const FIRST_INDEX = 10 * (currentSection - 1);
        const LAST_INDEX = totalPageList.length > 10 * currentSection ? 10 * currentSection : totalPageList.length;
        const viewPageList = totalPageList.slice(FIRST_INDEX, LAST_INDEX);
        setViewPageList(viewPageList);
    };

    // effect: total list 변경 시 실행 될 effect
    useEffect(() => {
        const totalPage = Math.ceil(totalList.length / countPerPage);
        const totalPageList: number[] = [];
        for (let page = 1; page <= totalPage; page++) totalPageList.push(page);
        setTotalPageList(totalPageList);

        const totalSection = Math.ceil(totalList.length / (countPerPage * 10));
        setTotalSection(totalSection);

        setCurrentPage(1);
        setCurrentSection(1);

        setView();
        setViewPage();
    }, [totalList]);

    // effect: current page 변경 시 실행 될 effect
    useEffect(setView, [currentPage]);

    // effect: current section 변경 시 실행 될 effect
    useEffect(setViewPage, [currentSection]);

    return {
        currentPage,
        setCurrentPage,
        currentSection,
        setCurrentSection,
        viewList,
        viewPageList,
        totalSection,
        setTotalList,
    };
};

export default usePagination;
