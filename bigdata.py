from pyspark.sql import SparkSession
from pyspark.sql.functions import sum as spark_sum
from pyspark.sql.functions import col, count
import json

spark = SparkSession.builder.appName("FlightDelayAnalysis").getOrCreate()

#Pegar caminho do arquivo 
filePath = './flight_delays.csv' #MUDAR URL
df = spark.read.csv(filePath, header=True, inferSchema=True)
# df.show(truncate=False)

#Contar total de voos atrasados
totalDelays = df.count()
# print("Total de voos atrasados: ", totalDelays)

#Pegar os aeroportos com mais atrasos
df_atrasos = df.filter(df["DelayMinutes"] > 0)
df_atrasos_por_origem = df_atrasos.groupBy("Origin").agg(spark_sum("DelayMinutes").alias("y"))
df_origens_mais_atrasadas = df_atrasos_por_origem.orderBy("y", ascending=False)
df_origens_mais_atrasadas_renamed = df_origens_mais_atrasadas.withColumnRenamed("Origin", "name")
# df_origens_mais_atrasadas.show()
dados_json = df_origens_mais_atrasadas_renamed.toPandas().to_dict(orient="records")
with open("./dados_atrasos.json", "w") as f:
   json.dump(dados_json, f, indent=4)

#Pegar os 3 principais motivos de atraso
df_delay_reasons = df.groupBy("DelayReason").agg(count("DelayReason").alias("y"))
df_top_delay_reasons = df_delay_reasons.orderBy(col("y").desc()).limit(10)
df_top_delay_reasons_renamed = df_top_delay_reasons.withColumnRenamed("DelayReason", "name")
# df_top_delay_reasons.show()
dados_json = df_top_delay_reasons_renamed.toPandas().to_dict(orient="records")
with open("./motivos_atrasos.json", "w") as f:
   json.dump(dados_json, f, indent=4)

#Pegar as aeronaves com mais atrasos
df_atrasos = df.filter(df["DelayMinutes"] > 0)
df_atrasos_por_aeronaves = df_atrasos.groupBy("AircraftType").agg(spark_sum("DelayMinutes").alias("y"))
df_aeronaves_mais_atrasadas = df_atrasos_por_aeronaves.orderBy("y", ascending=False)
df_aeronaves_mais_atrasadas_renamed = df_aeronaves_mais_atrasadas.withColumnRenamed("AircraftType", "name")
# df_aeronaves_mais_atrasadas.show()
dados_json = df_aeronaves_mais_atrasadas_renamed.toPandas().to_dict(orient="records")
with open("./aeronaves_atrasos.json", "w") as f:
   json.dump(dados_json, f, indent=4)

#Pegar os voos atrasados
df_atrasos = df.filter(df["DelayMinutes"] > 0)
df_atrasos_por_cancelamento = df_atrasos.groupBy("Cancelled").agg(spark_sum("DelayMinutes").alias("y"))
df_cancelamento_mais_atrasadas = df_atrasos_por_cancelamento.orderBy("y", ascending=False)
df_cancelamento_mais_atrasadas_renamed = df_cancelamento_mais_atrasadas.withColumnRenamed("Cancelled", "name")
df_cancelamento_mais_atrasadas_renamed.show()
dados_json = df_cancelamento_mais_atrasadas_renamed.toPandas().to_dict(orient="records")
with open("./cancelamentos_atrasos.json", "w") as f:
   json.dump(dados_json, f, indent=4)

