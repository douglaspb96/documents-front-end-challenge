import React, { useCallback, useEffect, useState, useRef } from "react";
import { Row } from "reactstrap";
import api from "../../api";
import { Input } from "../../components/input";
import PageContent from "../../components/page-content";
import PageHeader from "../../components/page-header";
import Table from "../../components/table";

export function DocumentMasterlist() {
  const inputTitleRef = useRef();
  const [masterList, setMasterList] = useState([]);

  const mapDocuments = useCallback((items = []) => {
    if (!items?.length) {
      return [];
    }

    return items.map((item) => ({
      code: item["code"],
      title: item["title"],
      releaseDate: item["release-date"],
      processes: item["processes"]?.map((process) => process.name).join(", "),
    }));
  }, []);

  const findDocuments = useCallback(async ({ title = "" } = {}) => {
    try {
      const params = [
        "active=true",
        "published=true",
        ...(title && ["title_like=" + title]),
      ].join("&");
      const response = await api.get(`/documents?${params}`);
      if (response?.data) {
        return mapDocuments(response.data);
      }
    } catch (error) {
      console.log(error);
    }
    return [];
  }, []);

  const handleTitleChange = (e) => {
    findDocuments({ title: e?.target?.value }).then((data) =>
      setMasterList(data)
    );
  };

  useEffect(() => {
    findDocuments()
      .then((data) => setMasterList(data))
      .catch((e) => {});
  }, []);

  return (
    <div>
      <PageHeader title="MasterList" />
      <PageContent>
        <Row>
          <Input
            ref={inputTitleRef}
            id="input-search-by-title"
            label="Pesquise pelo título do documento"
            onChange={handleTitleChange}
          />
        </Row>
        <Row>
          <Table
            itemsPerPage={5}
            rows={masterList || []}
            header={[
              {
                title: "Codigo",
                column: "code",
              },
              {
                title: "Titulo",
                column: "title",
              },
              {
                title: "Data de publicação",
                column: "releaseDate",
              },
              {
                title: "Processos",
                column: "processes",
              },
            ]}
          />
        </Row>
      </PageContent>
    </div>
  );
}
