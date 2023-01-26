import React, {
  useState, useEffect, useMemo, useCallback
} from 'react';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartTreemap from './components/ChartTreemap.jsx';

import '../styles/styles.less';

function App() {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const series = useMemo(() => [{
    color: 'rgba(0, 158, 219, 0.8)',
    dataLabels: {
      align: 'center',
      backgroundColor: '#004886',
      borderColor: '#fff',
      borderRadius: 0,
      borderWidth: 1,
      enabled: true,
      style: {
        color: '#fff',
        cursor: 'default',
        fontFamily: 'Roboto',
        fontSize: '14px',
        fontWeight: 400,
        textOutline: '0px solid #000',
        textTransform: 'uppercase'
      },
      verticalAlign: 'top',
      y: 5
    },
    id: 'raw materials',
    name: 'Raw Materials'
  }, {
    color: 'rgba(0, 158, 219, 0.8)',
    dataLabels: {
      align: 'center',
      backgroundColor: '#009ddb',
      borderColor: '#fff',
      borderRadius: 0,
      borderWidth: 1,
      enabled: true,
      style: {
        color: '#fff',
        cursor: 'default',
        fontFamily: 'Roboto',
        fontSize: '14px',
        fontWeight: 400,
        textOutline: '0px solid #000',
        textTransform: 'uppercase'
      },
      verticalAlign: 'top',
      y: 5
    },
    id: 'other natural fibres',
    name: 'Other Natural Fibres',
    parent: 'raw materials'
  }, {
    color: '#72bf44',
    dataLabels: {
      align: 'center',
      backgroundColor: '#006746',
      borderColor: '#fff',
      borderRadius: 0,
      borderWidth: 1,
      enabled: true,
      style: {
        color: '#fff',
        cursor: 'default',
        fontFamily: 'Roboto',
        fontSize: '14px',
        fontWeight: 400,
        textOutline: '0px solid #000',
        textTransform: 'uppercase'
      },
      verticalAlign: 'top',
      y: 5
    },
    id: 'products',
    name: 'Products'
  }], []);

  const cleanData = useCallback((data) => {
    data.map((el) => {
      series.push({
        dataLabels: {
          align: 'left',
          enabled: true,
          style: {
            color: '#fff',
            cursor: 'default',
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontWeight: 400,
            textOutline: '0px solid #000'
          },
          verticalAlign: 'bottom'
        },
        name: el.name,
        parent: el.parent,
        value: parseFloat(el.value),
      });
      return false;
    });
    return series;
  }, [series]);

  useEffect(() => {
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2023-plastic_substitutes/' : './'}assets/data/2023-plastic_substitutes_data.csv`;
    try {
      fetch(data_file)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.text();
        })
        .then(body => setDataFigure(cleanData(CSVtoJSON(body))));
    } catch (error) {
      console.error(error);
    }
  }, [cleanData]);

  return (
    <div className="app">
      {dataFigure && (
      <ChartTreemap
        idx="1"
        data={dataFigure}
        note="In addition, Approximately DOLLAR SIMBOL 4 billion of potential ALDFG-substitutes were traded in 2020"
        source="???"
        subtitle="Trade value of plastics substitutes exports, billion dollars, 2020"
        suffix=""
        title="Raw materials are driving the exports of plastic substitutes"
      />
      )}
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

export default App;
