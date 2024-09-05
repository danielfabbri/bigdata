from pyspark.sql import SparkSession
from pyspark.sql.functions import sum as spark_sum
from pyspark.sql.functions import col, count
import json

spark = SparkSession.builder.appName("FlightDelayAnalysis").getOrCreate()

#Pegar caminho do arquivo 
filePath = './flight_delays.csv' #MUDAR URL

df = spark.read.csv(filePath, header=True, inferSchema=True)
df.show(truncate=False)

#Contar total de voos atrasados
totalDelays = df.count()
print("Total de voos atrasados: ", totalDelays)

#Pegar os aeroportos com mais atrasos
df_atrasos = df.filter(df["DelayMinutes"] > 0)
df_atrasos_por_origem = df_atrasos.groupBy("Origin").agg(spark_sum("DelayMinutes").alias("TotalDelayMinutes"))
df_origens_mais_atrasadas = df_atrasos_por_origem.orderBy("TotalDelayMinutes", ascending=False)
df_origens_mais_atrasadas.show()

#Pegar os 3 principais motivos de atraso
df_delay_reasons = df.groupBy("DelayReason").agg(count("DelayReason").alias("Count"))
df_top_delay_reasons = df_delay_reasons.orderBy(col("Count").desc()).limit(3)
df_top_delay_reasons.show()

#dados_json = df_origens_mais_atrasadas.toPandas().to_dict(orient="records")
#mudar url
#with open("./dados_atrasos.json", "w") as f:
#    json.dump(dados_json, f, indent=4)
